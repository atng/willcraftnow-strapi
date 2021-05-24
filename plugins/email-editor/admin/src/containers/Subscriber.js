import React from "react";
import { Padded, Flex } from "@buffetjs/core";
import { Header } from "@buffetjs/custom";
import { useParams, useHistory } from "react-router-dom";
import { InputText, Toggle } from "@buffetjs/core";
import axios from "axios";
import pluginId from "../pluginId";
import { baseUrl } from "../baseUrl";
import { useTouched } from "../hooks/useTouched";

const Subscriber = (props) => {
  const { id } = useParams();
  const history = useHistory();

  const [data, setData] = React.useState({
    subscribed: true,
    email: "",
  });
  const [touched, setTouched, touchedSave] = useTouched(false);

  React.useEffect(() => {
    const getData = async () => {
      if (id) {
        const { data } = await axios.get(
          `${baseUrl}/${pluginId}/subscribers/${id}`
        );
        setData(data);
      }
    };
    getData();
  }, []);

  return (
    <Padded left right top bottom size="md">
      <Header
        actions={[
          {
            label: "Back",
            onClick: () => history.push(`/plugins/${pluginId}/subscribers`),
            color: "secondary",
            type: "button",
          },
          {
            label: "Save",
            onClick: async () => {
              await axios.post(`${baseUrl}/${pluginId}/subscribers`, data);
              touchedSave(data);
            },
            color: "primary",
            type: "button",
            disabled: !touched,
          },
        ]}
        title={{
          label: "Subscribers",
        }}
        content={`${id ? "Edit" : "Add New"} Subscribers.`}
      />
      <Flex justifyContent="space-between">
        <InputText
          name="input"
          onChange={({ target: { value } }) => {
            setTouched({ email: value });
            setData((state) => ({ ...state, email: value }));
          }}
          placeholder="Email"
          type="email"
          value={data.email}
        />
        <Toggle
          name="toggle"
          onChange={({ target: { value } }) => {
            setTouched({ subscribed: value });
            setData((state) => ({ ...state, subscribed: value }));
          }}
          value={data.subscribed}
        />
      </Flex>
    </Padded>
  );
};

export default Subscriber;
