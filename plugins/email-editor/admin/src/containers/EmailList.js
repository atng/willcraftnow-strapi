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

const EmailList = (props) => {
  const history = useHistory();
  const location = useLocation();
  const [sending, setSending] = React.useState(false);
  const [sendingTest, setSendingTest] = React.useState(false);
  const [dataResponse, setDataResponse] = React.useState(null);

  const getDataResponse = async () => {
    const response = await axios.get(`${baseUrl}/${pluginId}/emails`);
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
      icon: (
        <Padded left right size="sm">
          <FontAwesomeIcon icon={faPaperPlane} /> Send
        </Padded>
      ),
      onClick: async (data) => {
        if (sending) return;
        setSending(true);
        strapi.notification.toggle({
          type: "info",
          message:
            "Sending Emails. This will take some time. We'll let you know when it's done. Please don't navigate away.",
        });
        try {
          const response = await axios.post(
            `${baseUrl}/${pluginId}/send/${data.id}`
          );
          strapi.notification.toggle({
            type: "success",
            message: "Emails Sent Successfully.",
          });
        } catch (e) {
          strapi.notification.toggle({
            type: "warning",
            message: e.message,
          });
        }
        setSending(false);
      },
    },
    {
      icon: (
        <Padded left right size="sm">
          <FontAwesomeIcon icon={faPaperPlane} /> Send Test
        </Padded>
      ),
      onClick: async (data) => {
        if (sendingTest) return;
        setSendingTest(true);
        strapi.notification.toggle({
          type: "info",
          message:
            "Sending Test Email. We'll let you know when it's done. Please don't navigate away.",
        });
        try {
          const response = await axios.post(
            `${baseUrl}/${pluginId}/send-test/${data.id}`
          );
          strapi.notification.toggle({
            type: "success",
            message: "Test Email Sent Successfully.",
          });
        } catch (e) {
          strapi.notification.toggle({
            type: "warning",
            message: e.message,
          });
        }
        setSendingTest(false);
      },
    },
    {
      icon: <FontAwesomeIcon icon={faTrashAlt} />,
      onClick: (data) => {
        console.log(data);
      },
    },
  ];

  const onClickRow = (e, { id }) => {
    history.push(`/plugins/${pluginId}/add_emails/${id}`);
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
        onClick: () => history.push(`/plugins/${pluginId}/add_emails`),
        color: "primary",
        type: "button",
        icon: <FontAwesomeIcon icon={faPlus} />,
      },
    ],
    title: {
      label: "Campaign Emails",
    },
    content: "All your Campaign Emails.",
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

export default EmailList;
