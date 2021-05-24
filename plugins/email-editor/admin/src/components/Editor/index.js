import React, { memo, useRef } from "react";
import UnlayerEditor from "react-email-editor";
import { useParams, useHistory } from "react-router-dom";
import { InputText, Padded } from "@buffetjs/core";
import MediaLib from "../../components/MediaLibrary";
import { Header } from "@buffetjs/custom";
import { useTouched } from "../../hooks/useTouched";

const Editor = ({ onSave, data: initialData, headerProps, inputs }) => {
  const emailEditorRef = useRef(null);
  const [saving, setSaving] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [touched, setTouched, touchedSave] = useTouched(initialData);
  const [isOpen, setIsOpen] = React.useState(false);
  const [exportData, setExportData] = React.useState(initialData);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const exportHtml = async () => {
    setSaving(true);
    await onSave(exportData);
    await touchedSave(exportData);
    setSaving(false);
  };

  const ref = React.useRef();
  const handleChange = (data, done) => {
    if (ref.current) {
      ref.current(data);
    } else {
      setIsOpen(true);
      ref.current = done;
    }
  };

  React.useEffect(() => {
    setTouched(exportData);
  }, [exportData]);

  const onLoad = () => {
    if (!(emailEditorRef.current && emailEditorRef.current.editor)) return;
    emailEditorRef.current.editor.loadDesign(exportData.design);
    emailEditorRef.current.editor.setMergeTags({
      email: {
        name: "Email",
        value: "{{= email }}",
        sample: "john@example.com",
      },
      first_name: {
        name: "First Name",
        value: "{{= first_name }}",
        sample: "John",
      },
      last_name: {
        name: "Last Name",
        value: "{{= last_name }}",
        sample: "Doe",
      },
    });
    emailEditorRef.current.editor.registerCallback(
      "selectImage",
      (data, done) => {
        handleChange(data, done);
      }
    );
    emailEditorRef.current.editor.addEventListener(
      "design:updated",
      function (updates) {
        emailEditorRef.current.editor.exportHtml((data) => {
          setExportData((state) => ({
            ...state,
            html: data.html,
            design: data.design,
          }));
        });
        emailEditorRef.current.editor.exportPlainText(
          (data) => {
            setExportData((state) => ({
              ...state,
              text: data.text,
            }));
          },
          {
            ignoreLinks: true,
          }
        );
      }
    );
    setLoaded(true);
  };

  //   this refreshes the editor. Sometimes it does not load since the ref is missing
  React.useEffect(() => {
    if (!loaded) {
      onLoad();
    }
  }, [!(emailEditorRef.current && emailEditorRef.current.editor)]);

  return (
    <Padded top bottom left right size="md">
      <Header
        title={headerProps.title}
        content={headerProps.content}
        actions={[
          ...headerProps.actions,
          {
            label: "Save",
            onClick: exportHtml,
            color: "primary",
            type: "button",
            disabled: !touched,
            isLoading: saving,
          },
        ]}
      />

      {inputs.map(({ key, placeholder }) => (
        <Padded bottom size="sm" key={key}>
          <InputText
            name={key}
            onChange={({ target: { value } }) => {
              setExportData((state) => ({
                ...state,
                [key]: value,
              }));
            }}
            placeholder={placeholder}
            type="text"
            value={exportData[key]}
          />
        </Padded>
      ))}
      <MediaLib
        onToggle={handleToggle}
        isOpen={isOpen}
        onChange={handleChange}
      />
      <UnlayerEditor
        ref={emailEditorRef}
        onLoad={onLoad}
        options={{
          appearance: {
            theme: "dark",
          },
        }}
      />
    </Padded>
  );
};

export default Editor;
