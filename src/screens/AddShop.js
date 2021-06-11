import { useForm } from "react-hook-form";
import AuthLayout from "../components/auth/AuthLayout";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import Button from "../components/auth/Button";
import { gql, useMutation } from "@apollo/client";

import FormError from "../components/auth/FormError";

const CREATE_COFFEE_SHOP_MUTATION = gql`
  mutation createCoffeeShop(
    $name: String!
    $latitude: String!
    $longitude: String!
    $category: String
    $file: Upload
  ) {
    createCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      category: $category
      file: $file
    ) {
      ok
      error
    }
  }
`;

function AddShop({ name }) {
  const onCompleted = (data) => {
    const a = data;
    console.log(a);
  };
  const [
    createCoffeeShopMutation,
    { loading },
  ] = useMutation(CREATE_COFFEE_SHOP_MUTATION, { onCompleted });
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onChange",
  });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    createCoffeeShopMutation({
      variables: {
        ...data,
      },
    });
  };

  return (
    <AuthLayout>
      <PageTitle title="Create Shop" />
      <FormBox>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register}
            name="name"
            type="text"
            placeholder="Shop Name"
          />
          <FormError message={errors?.name?.message} />
          <Input
            ref={register({
              required: "Latitude is required",
            })}
            name="latitude"
            type="text"
            placeholder="Latitude"
          />
          <FormError message={errors?.latitude?.message} />
          <Input
            ref={register({
              required: "Longitude is required",
            })}
            name="longitude"
            type="text"
            placeholder="Longitude"
          />
          <FormError message={errors?.longitude?.message} />

          <Input
            ref={register}
            name="category"
            type="text"
            placeholder="Category"
          />
          <FormError message={errors?.category?.message} />
          <Input ref={register} type="file" name="file" />
          <FormError message={errors?.file?.message} />

          <Button
            type="submit"
            value={loading ? "loading..." : "Create Shop"}
            disabled={!formState.isValid || loading}
          />
          <FormError message={errors?.result?.message} />
        </form>
      </FormBox>
    </AuthLayout>
  );
}

// AddShop.propTypes = {
//   name: PropTypes.string.isRequired,
//   latitude: PropTypes.string.isRequired,
//   longitude: PropTypes.string.isRequired,
//   category: PropTypes.string,
//   file: PropTypes.string,
// };

export default AddShop;
