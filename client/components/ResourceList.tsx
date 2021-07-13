import { SimpleGrid, Text, Button, Fade } from "@chakra-ui/react";
import { AddResourceForm } from "./AddResourceForm";
import { SkeletonGrid } from "./SkeletonGrid";
import { CardLayout } from "./layouts";
import { useResource } from "../hooks/useResource";
import { ResourceCard } from "./ResourceCard";
import { useState } from "react";
import { MyResource } from "../../types";

export function ResourceList() {
  /**
   * For the sake of the example we only show the retrieved resources.
   * Get creative with all the other methods:
   * - updateResource
   * - deleteResource
   */
  const {
    resources,
    resourcesRetrievalError,
    areResourcesLoading,
    createResource,
  } = useResource();

  if (resourcesRetrievalError) {
    return <ErrorMessage />;
  }

  if (areResourcesLoading) {
    return <SkeletonGrid />;
  }

  return (
    <Fade transition={{ enter: { duration: 1 } }} in={!areResourcesLoading}>
      <SimpleGrid minChildWidth="250px" gap={8}>
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
        <AddResource createResource={createResource} />
      </SimpleGrid>
    </Fade>
  );
}

function AddResource({
  createResource,
}: {
  createResource: (resource: MyResource) => Promise<void>;
}) {
  const [isFormActive, setIsFormActive] = useState(false);

  return (
    <CardLayout
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      {isFormActive ? (
        <Fade transition={{ enter: { duration: 0.5 } }} in={isFormActive}>
          <AddResourceForm
            createResource={createResource}
            closeResourceForm={() => setIsFormActive(false)}
          />
        </Fade>
      ) : (
        <AddResourceButton openResourceForm={() => setIsFormActive(true)} />
      )}
    </CardLayout>
  );
}

const AddResourceButton = ({
  openResourceForm,
}: {
  openResourceForm: () => void;
}) => (
  <>
    <Button
      height="5rem"
      width="5rem"
      borderWidth={3}
      color="gray"
      fontSize="4rem"
      variant="outline"
      onClick={openResourceForm}
    >
      +
    </Button>
    <Text mt="4" fontSize="md" lineHeight="short">
      Add Resource
    </Text>
  </>
);

const ErrorMessage = () => (
  <Text color="red">
    Sorry, something went wrong! Please check your setup 💀
  </Text>
);
