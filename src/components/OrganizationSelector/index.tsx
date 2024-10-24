import { AuthLoggedUserContext } from "@providers/authLoggedUserProvider";
import { Flex, Select, Text } from "@radix-ui/themes";
import { Building2 } from "lucide-react";
import React, { useContext } from "react";

export const OrganizationSelector: React.FC = () => {
  const { selectedOrganizationId, organizations, setSelectedOrganizationId } =
    useContext(AuthLoggedUserContext);

  const handleOrganizationChange = (organizationId: string) => {
    setSelectedOrganizationId(Number(organizationId));
  };

  return (
    <Select.Root
      value={selectedOrganizationId.toString()}
      onValueChange={handleOrganizationChange}
      size="3"
    >
      <Select.Trigger></Select.Trigger>
      <Select.Content>
        {organizations?.map((organization, index) => (
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
