import {
  Box,
  Image,
  Flex,
  Text,
} from "@chakra-ui/react";

import { CardLayout } from "./layouts";

import type { ResourceRecord } from "../../types";

type ResourceCardProps = {
  resource: ResourceRecord;
};

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <CardLayout>
      <Flex
        width="100%"
        height="200px"
        justifyContent="center"
        padding="20px 0"
        mb={2}
      >
        <Image
          objectFit="contain"
          borderRadius="md"
          alt={resource.fields.Name}
          src={resource.fields.Pictures[0].url}
        />
      </Flex>
      <Box mb={2}>
        <Text
          noOfLines={2}
          fontSize="xl"
          fontWeight="semibold"
          lineHeight="short"
        >
          {resource.fields.Name}
        </Text>
      </Box>
      <Box>
        <Text noOfLines={2} lineHeight="short">
          {resource.fields.Description}
        </Text>
      </Box>
    </CardLayout>
  );
}
