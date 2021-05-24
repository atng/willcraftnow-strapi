/*
 *
 * HomePage
 *
 */

import React, { memo, useRef } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import pluginId from "../pluginId";
import { baseUrl } from "../baseUrl";
import Editor from "../components/Editor/";

const DefaultSubscribeEditor = ({ urlKey }) => {
  const { email_type } = useParams();
  const history = useHistory();

  const [data, setData] = React.useState({
    html: "",
    text: "",
    design: "",
    subject: "",
    loaded: false,
  });

  const getData = async () => {
    const { data } = await axios.get(
      `${baseUrl}/${pluginId}/${urlKey}/${email_type}`
    );
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
    axios.post(`${baseUrl}/${pluginId}/${urlKey}/${email_type}`, {
      ..._data,
      email_type,
    });
  };

  const headerProps = {
    title: {
      label: `${
        email_type.toUpperCase() === "SUBSCRIBE" ? "Subscribe" : "Unsubscribe"
      } Template`,
    },
    content: `Edit Template.`,
    actions: [
      {
        label: `Back`,
        onClick: () => history.push(`/plugins/${pluginId}`),
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
      inputs={[{ key: "subject", placeholder: "Subject Line" }]}
    />
  );
};

export default DefaultSubscribeEditor;
