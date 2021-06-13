import { useForm } from "react-hook-form";
import AuthLayout from "../components/auth/AuthLayout";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import Button from "../components/auth/Button";
import { gql, useMutation } from "@apollo/client";
import FormError from "../components/auth/FormError";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { uploadVar } from "../apollo";
import { useReactiveVar } from "@apollo/client";
import styled from "styled-components";

const Img = styled.img`
  margin-top: 10px;
  max-width: 300px;
`;

const CREATE_COFFEE_SHOP_MUTATION = gql`
  mutation createCoffeeShop(
    $name: String!
    $latitude: String!
    $longitude: String!
    $category: String
    $photos: Upload
  ) {
    createCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      category: $category
      photos: $photos
    ) {
      ok
      error
    }
  }
`;

function AddShop() {
  const history = useHistory();
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onChange",
  });

  const onCompleted = (data) => {
    const {
      createCoffeeShop: { ok },
    } = data;
    if (!ok) {
      console.log(data);
      return;
    }
    history.push("/");
  };

  const [
    createCoffeeShopMutation,
    { loading },
  ] = useMutation(CREATE_COFFEE_SHOP_MUTATION, { onCompleted });

  const [preview, setPreview] = useState(null);
  const isUploaded = useReactiveVar(uploadVar);

  let photoFile;

  const onPhotoChange = (e) => {
    const {
      target: {
        files: [file],
      },
    } = e;
    photoFile = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
      uploadVar(true);
    };
  };

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }

    createCoffeeShopMutation({
      variables: {
        name: data.name,
        latitude: data.latitude,
        longitude: data.longitude,
        category: data.category,
        photos: photoFile,
      },
    });
  };

  return (
    <AuthLayout>
      <PageTitle title="Create Shop" />
      <FormBox>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register({
              required: "name is required",
            })}
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
          <Input
            ref={register}
            type="file"
            name="photos"
            onChange={onPhotoChange}
            multiple
            accept="image/*"
          />
          {isUploaded ? <Img src={preview} alt="preview" /> : null}
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
