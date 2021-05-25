/*
 *
 * HomePage
 *
 */

import React from "react";

import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

import pluginId from "../../pluginId";
import { baseUrl } from "../../baseUrl";

import Editor from "../../components/Editor/";

const EmailEditor = ({ urlKey }) => {
  const { id } = useParams();
  const history = useHistory();

  const [data, setData] = React.useState({
    html: "",
    text: "",
    design: "",
    subject: "",
    loaded: false,
  });

  const getData = async () => {
    const { data } = await axios.get(`${baseUrl}/${pluginId}/${urlKey}/${id}`);
    setData({
      html: data.html,
      text: data.text,
      design: data.design,
      subject: data.subject,
      loaded: true,
    });
  };

  React.useEffect(() => {
    getData();
  }, []);

  const onSave = async (_data) => {
    if (id) {
      axios.put(`${baseUrl}/${pluginId}/${urlKey}/${id}`, _data);
    } else {
      axios.post(`${baseUrl}/${pluginId}/${urlKey}`, _data);
    }
  };

  const headerProps = {
    title: { label: "Template Editor" },
    content: `${id ? "Edit" : "Add"} Template.`,
    actions: [
      {
        label: `Back`,
        onClick: () => history.push(`/plugins/${pluginId}/${urlKey}`),
        color: "secondary",
        type: "button",
      },
    ],
  };

  if (!data.loaded) return null;

  return (
    <Editor
      onSave={onSave}
      data={data}
      headerProps={headerProps}
      inputs={[
        { key: "title", placeholder: "Template Title" },
        { key: "subject", placeholder: "Subject Line" },
      ]}
    />
  );
};

export default EmailEditor;
