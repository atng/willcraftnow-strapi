import React from "react";
import Table from "../components/Table";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import { baseUrl } from "../baseUrl";
import pluginId from "../pluginId";

const TemplateList = (props) => {
  const history = useHistory();

  const [dataResponse, setDataResponse] = React.useState(null);

  const getDataResponse = async () => {
    const response = await axios.get(`${baseUrl}/${pluginId}/templates`);
    setDataResponse(response);
  };

  React.useEffect(() => {
    getDataResponse();
  }, []);

  if (!dataResponse) return null;

  const headers = [
    {
      name: "Id",
      value: "id",
      isSortEnabled: true,
    },
    {
      name: "Template Title",
      value: "title",
      isSortEnabled: true,
    },
    {
      name: "Subject Line",
      value: "subject",
      isSortEnabled: true,
    },
    {
      name: "Sent",
      value: "sent_on",
      isSortEnabled: true,
    },
  ];

  const rowLinks = [
    {
      icon: <FontAwesomeIcon icon={faCopy} />,
      onClick: (data) => {
        history.push(`/plugins/${pluginId}/add_email_templates/${data.id}`);
      },
    },
    {
      icon: <FontAwesomeIcon icon={faTrashAlt} />,
      onClick: async (data) => {
        await axios.delete(`${baseUrl}/${pluginId}/templates/${data.id}`);
        getDataResponse();
      },
    },
  ];

  const onClickRow = (e, { id }) => {
    history.push(`/plugins/${pluginId}/add_templates/${id}`);
  };

  const headerProps = {
    actions: [
      {
        label: "Back to Home",
        onClick: () => history.push(`/plugins/${pluginId}`),
        color: "secondary",
        type: "button",
      },
      {
        label: "New",
        onClick: () => history.push(`/plugins/${pluginId}/add_templates`),
        color: "primary",
        type: "button",
        icon: <FontAwesomeIcon icon={faPlus} />,
      },
    ],
    title: {
      label: "Templates",
    },
    content: "All your Templates.",
  };

  const { data } = dataResponse;

  return (
    <Table
      data={data}
      getData={getDataResponse}
      headers={headers}
      rowLinks={rowLinks}
      onClickRow={onClickRow}
      headerProps={headerProps}
    />
  );
};

export default TemplateList;
