import { useEffect, useState } from "react";
import type { MyResource, ResourceRecord } from "../../types";

export function useResource() {
  const [areResourcesLoading, setAreResourcesLoading] = useState(false);
  const [resources, setResources] = useState<ResourceRecord[]>([]);
  const [resourcesRetrievalError, setResourcesRetrievalError] = useState(null);

  /** Example of how to properly retrieve resources. */
  useEffect(() => {
    const retrieveResources = async function () {
      setAreResourcesLoading(true);
      try {
        const resources = (await (
          await fetch(`/api/resources`)
        ).json()) as ResourceRecord[];
        setResources(resources);
      } catch (err) {
        setResourcesRetrievalError(err);
      } finally {
        setAreResourcesLoading(false);
      }
    };

    retrieveResources();
  }, []);

  /** Example of how to update a single resource. */
  const updateResource = async function (resource: Partial<ResourceRecord>) {
    try {
      const response = await fetch(`/api/resources/${resource.id}`, {
        method: "PUT",
        body: JSON.stringify(resource),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw Error(response.statusText);
      }

      const [updatedResource] = await response.json();

      /** Find the changed resource and replace it. */
      const updatedResourceIndex = resources.findIndex(
        (resource) => resource.id === updatedResource.id
      );
      resources.splice(updatedResourceIndex, 1, updatedResource);

      setResources([...resources]);
    } catch (err) {
      throw err;
    }
  };

  const deleteResource = async function (resourceId: string) {
    try {
      const response = await fetch(`/api/resources/${resourceId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw Error(response.statusText);
      }

      /** Find the changed resource and delete it. */
      const deletedResourceIndex = resources.findIndex(
        (resource) => resource.id === resourceId
      );
      resources.splice(deletedResourceIndex, 1);
      setResources([...resources]);
    } catch (err) {
      throw err;
    }
  };

  const createResource = async function (resource: MyResource) {
    try {
      const response = await fetch(`/api/resources`, {
        method: "POST",
        body: JSON.stringify(resource),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw Error(response.statusText);
      }

      /** Append the new resource on the existing ones */
      const newResource = await response.json();
      setResources([...resources, newResource]);
    } catch (err) {
      throw err;
    }
  };

  return {
    areResourcesLoading,
    resources,
    resourcesRetrievalError,
    updateResource,
    deleteResource,
    createResource,
  };
}
