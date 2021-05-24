import React from "react";
import { List } from "@buffetjs/custom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faPencilAlt,
  faCube,
} from "@fortawesome/free-solid-svg-icons";

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

function Example() {
  const props = {
    title: "Best Top Chefs",
    subtitle: "The most successful French Top Chefs",
    button: {
      color: "secondary",
      icon: true,
      label: "New",
      onClick: () => alert("Do you want to create a new chief entry?"),
      type: "button",
    },
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
      name: "ratatouille",
      description:
        "Bacon ipsum dolor amet boudin shankle picanha shoulder bacon.",
      links: [
        {
          icon: <FontAwesomeIcon icon={faPencilAlt} />,
          onClick: handleEditClick,
        },
        {
          icon: <FontAwesomeIcon icon={faTrashAlt} />,
          onClick: handleDeleteClick,
        },
      ],
      onClick: () => alert("Ratatouille"),
    },
    {
      icon: <FontAwesomeIcon icon={faCube} />,
      name: "users",
      description: "Tenderloin drumstick cupim cow.",
      links: [
        {
          icon: <FontAwesomeIcon icon={faPencilAlt} />,
          onClick: handleEditClick,
        },
        {
          icon: <FontAwesomeIcon icon={faTrashAlt} />,
          onClick: handleDeleteClick,
        },
      ],
      onClick: () => alert("Users"),
    },
  ];

  return (
    <CustomList
      {...props}
      items={rows}
      customRowComponent={(props) => <CustomRow {...props} />}
    />
  );
}
