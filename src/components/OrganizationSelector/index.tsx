import { OrganizationsContext } from "@providers/organizationsProvider";
import { Flex, Select, Text } from "@radix-ui/themes";
import { Building2 } from "lucide-react";
import React, { useContext } from "react";

export const OrganizationSelector: React.FC = () => {
  const { setOrganizationId, organization, listOfOrganizations } =
    useContext(OrganizationsContext);

  const handleOrganizationChange = (organizationId: string) => {
    setOrganizationId(Number(organizationId));
  };

  if (!listOfOrganizations || listOfOrganizations.length === 1) {
    return null;
  }

  return (
    <Select.Root
      value={organization?.organizationId.toString()}
      onValueChange={handleOrganizationChange}
      size="3"
    >
      <Select.Trigger></Select.Trigger>
      <Select.Content>
        {listOfOrganizations?.map((organization, index) => (
          <Select.Item
            key={index}
            value={organization.organizationId.toString()}
          >
            <Flex align="center" justify="center" gap="2">
              <Building2 size="16" />
              <Text size="2">{organization.name}</Text>
              <Text size="2">[{organization.taxNumber}]</Text>
            </Flex>
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};
