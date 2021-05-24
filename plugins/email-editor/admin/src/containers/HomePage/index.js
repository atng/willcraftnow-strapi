/*
 *
 * HomePage
 *
 */

import React, { memo, useRef } from "react";
import axios from "axios";
import pluginId from "../../pluginId";
import EmailList from "../EmailList";

import { List } from "@buffetjs/custom";
import { IconLinks, Padded } from "@buffetjs/core";
import { CustomRow as Row } from "@buffetjs/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faPencilAlt,
  faCube,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

const CustomRow = ({ icon, description, links, name, onClick }) => {
  const styles = {
    name: {
      textTransform: "capitalize",
    },
  };

  return (
    <Row onClick={onClick}>
      <td>{icon}</td>
      <td>
        <p style={styles.name}>{name}</p>
      </td>
      <td>
        <p>{description}</p>
      </td>
      <td>
        <IconLinks links={links} />
      </td>
    </Row>
  );
};

const HomePage = () => {
  const history = useHistory();
  const props = {
    title: "Email Editor",
    subtitle: "Manage your email campaigns here.",
  };

  const handleEditClick = (e) => {
    alert("Edit");
    e.stopPropagation();
  };

  const handleDeleteClick = (e) => {
    alert("Delete");
    e.stopPropagation();
  };

  const rows = [
    {
      icon: <FontAwesomeIcon icon={faCube} />,
      name: "Templates",
      description: "Construct email templates. Use them in drafts directly.",
      onClick: () =>
        history.push(
          `/plugins/${pluginId}/templates?page=1&pageSize=10&_sort=title:ASC`
        ),
    },
    {
      icon: <FontAwesomeIcon icon={faCube} />,
      name: "Subscribers",
      description: "Manage subscribers.",
      onClick: () =>
        history.push(
          `/plugins/${pluginId}/subscribers?page=1&pageSize=10&_sort=title:ASC`
        ),
    },
    {
      icon: <FontAwesomeIcon icon={faCube} />,
      name: "Campaign Emails",
      description: "Draft and send campaign emails.",
      onClick: () =>
        history.push(
          `/plugins/${pluginId}/emails?page=1&pageSize=10&_sort=title:ASC`
        ),
    },
    {
      icon: <FontAwesomeIcon icon={faCube} />,
      name: "Default Emails",
      description:
        "Customize the emails sent when users subscribe or unsubscribe.",
      links: [
        {
          icon: "Unsubscribe Email",
          onClick: () =>
            history.push(`/plugins/${pluginId}/default_emails/unsubscribe`),
        },
        {
          icon: "Subscribe Email",
          onClick: () =>
            history.push(`/plugins/${pluginId}/default_emails/subscribe`),
        },
      ],
    },
  ];

  return (
    <Padded size="md" top left right bottom>
      <List
        {...props}
        items={rows}
        customRowComponent={(props) => <CustomRow {...props} />}
      />
    </Padded>
  );
};

export default HomePage;
// const HomePage = (props) => {
//   const [data, setData] = React.useState(null);

//   React.useEffect(() => {
//     const getData = async (url) => {
//       const response = await axios.get(
//         "http://localhost:1337/email-editor/templates"
//       );
//       setData(response);
//     };
//     getData();
//   }, []);

//   console.log(data);

//   if (!data) return null;

//   return <EmailList data={data.data} />;
// };

// export default memo(HomePage);
