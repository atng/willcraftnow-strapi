import React from "react";
import Table from "../components/Table";
import { useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Padded } from "@buffetjs/core";
import {
  faPencilAlt,
  faPaperPlane,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import { baseUrl } from "../baseUrl";
import pluginId from "../pluginId";
import { useStrapi } from "strapi-helper-plugin";

const SubscriberList = (props) => {
  const history = useHistory();
  const location = useLocation();
  // const { strapi } = useStrapi();

  const [dataResponse, setDataResponse] = React.useState(null);

  const getDataResponse = async () => {
    const response = await axios.get(`${baseUrl}/${pluginId}/subscribers`);
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
      name: "Email",
      value: "email",
      isSortEnabled: true,
    },
    {
      name: "Subscribed",
      value: "subscribed",
      isSortEnabled: true,
    },
    {
      name: "Subscribed At",
      value: "created_at",
      isSortEnabled: true,
    },
  ];

  const rowLinks = [
    {
      icon: (
        <Padded left right size="sm">
          <FontAwesomeIcon icon={faPaperPlane} /> Subscribe Email
        </Padded>
      ),
      onClick: async (data) => {
        strapi.notification.toggle({
          type: "info",
          message: `Sending Subscribe Email to ${data.email}.`,
        });
        try {
          const response = await axios.post(
            `${baseUrl}/${pluginId}/send-subscribe/${data.id}`
          );
        } catch (e) {
          strapi.notification.toggle({
            type: "warning",
            message: e.message,
          });
        }
        strapi.notification.toggle({
          type: "success",
          message: "Email Sent Successfully.",
        });
      },
    },
    {
      icon: (
        <Padded left right size="sm">
          <FontAwesomeIcon icon={faPaperPlane} /> Unsubscribe Email
        </Padded>
      ),
      onClick: async (data) => {
        strapi.notification.toggle({
          type: "info",
          message: `Sending Unsubscribe Email to ${data.email}.`,
        });
        try {
          const response = await axios.post(
            `${baseUrl}/${pluginId}/send-unsubscribe/${data.id}`
          );
        } catch (e) {
          strapi.notification.toggle({
            type: "warning",
            message: e.message,
          });
        }
        strapi.notification.toggle({
          type: "success",
          message: "Email Sent Successfully.",
        });
      },
    },
    {
      icon: <FontAwesomeIcon icon={faTrashAlt} />,
      onClick: async (data) => {
        await axios.delete(`${baseUrl}/${pluginId}/subscribers/${data.id}`);
        getDataResponse();
      },
    },
  ];

  const onClickRow = (e, { id }) => {
    history.push(`/plugins/${pluginId}/add_subscribers/${id}`);
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
        onClick: () => history.push(`/plugins/${pluginId}/add_subscribers`),
        color: "primary",
        type: "button",
        icon: <FontAwesomeIcon icon={faPlus} />,
      },
    ],
    title: {
      label: "Subscribers",
    },
    content: "All your subscribers.",
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

export default SubscriberList;
