import {
  Button,
  VStack,
  HStack,
  Input,
  FormLabel,
  FormControl,
  FormHelperText,
} from "@chakra-ui/react";

import { useForm, SubmitHandler } from "react-hook-form";
import { MyResource } from "../../types";

export function AddResourceForm({
  closeResourceForm,
  createResource,
}: {
  closeResourceForm: () => void;
  createResource: (resource: MyResource) => Promise<void>;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MyResource>();

  const onSubmit: SubmitHandler<MyResource> = (data) => {
    createResource(data);
    reset();
  };

  return (
    <VStack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="name">
          <FormLabel fontSize="sm">Resource Name</FormLabel>
          <Input type="text" {...register("Name", { required: true })} />
        </FormControl>
        <FormControl id="description">
          <FormLabel fontSize="sm">Resource Description</FormLabel>
          <Input type="text" {...register("Description", { required: true })} />
        </FormControl>
        <FormControl id="image-url">
          <FormLabel fontSize="sm">Resource Image URL</FormLabel>
          <Input
            type="text"
            {...register("Pictures.0.url", { required: true })}
          />
          <FormHelperText mt={0.5} fontSize="sm">
            Should be a publicly accessible URL.
          </FormHelperText>
        </FormControl>
        <HStack mt={2} justifyContent="center">
          <Button
            variant="solid"
            background="brand.green"
            color="white"
            type="submit"
          >
            Add
          </Button>
          <Button
            variant="solid"
            background="brand.red"
            color="white"
            type="reset"
            onClick={closeResourceForm}
          >
            Back
          </Button>
        </HStack>
      </form>
    </VStack>
  );
}
