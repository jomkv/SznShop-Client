import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import Spinner from "../Spinner/Spinner";
import {
  getMunicipalities,
  getProvinces,
  getRegions,
} from "../../utils/geoHelpers";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  postalCode: z
    .string()
    .min(4, "Please enter a valid postal code")
    .max(4, "Please enter a valid postal code"),
  addressLabel: z
    .string()
    .min(1, "Address label is required")
    .max(50, "Address label must be less than 50 characters"),
  phoneNumber: z.string().min(1, "Phone number is required"),
});

function AddressForm({ defaultValues, onSubmit, isLoading }) {
  const [regions, setRegions] = useState(null);
  const [provinces, setProvinces] = useState(null);
  const [municipalities, setMunicipalities] = useState(null);

  const [region, setRegion] = useState(null);
  const [province, setProvince] = useState(null);
  const [municipality, setMunicipality] = useState(null);

  const provinceRef = useRef();
  const municipalityRef = useRef();

  const form = useForm({
    defaultValues: {
      firstName: defaultValues?.firstName || "",
      lastName: defaultValues?.lastName || "",
      address: defaultValues?.address || "",
      postalCode: defaultValues?.postalCode || "",
      addressLabel: defaultValues?.addressLabel || "",
      phoneNumber: defaultValues?.phoneNumber || "",
    },
    resolver: zodResolver(schema),
  });

  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  useEffect(() => {
    setRegions(getRegions());
  }, []);

  useEffect(() => {
    setProvince(null);
    setMunicipalities(null);
    provinceRef.current.selectedIndex = 0;
    municipalityRef.current.selectedIndex = 0;

    if (region) {
      setProvinces(getProvinces(region));
    }
  }, [region]);

  useEffect(() => {
    setMunicipality(null);
    municipalityRef.current.selectedIndex = 0;

    if (province) {
      setMunicipalities(getMunicipalities(province));
    }
  }, [province]);

  const handleFormSubmit = async (data) => {
    console.log("submit");
    if (!region || !province || !municipality) {
      console.log(region, province, municipality);
      return;
    }

    const formData = {
      ...data,
      region,
      province,
      municipality,
    };

    await onSubmit(formData);

    reset();
    setRegion(null);
    setProvince(null);
    setMunicipality(null);
  };

  return (
    <Form className="mt-3" noValidate onSubmit={handleSubmit(handleFormSubmit)}>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>FIRST NAME</Form.Label>
          <Form.Control
            type="text"
            {...register("firstName")}
            isInvalid={errors.firstName?.message ? true : false}
          />
          <Form.Control.Feedback type="invalid">
            {errors.firstName?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>LAST NAME</Form.Label>
          <Form.Control
            type="text"
            {...register("lastName")}
            isInvalid={errors.lastName?.message ? true : false}
          />
          <Form.Control.Feedback type="invalid">
            {errors.lastName?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>ADDRESS LINE</Form.Label>
        <Form.Control
          placeholder="Apartment, building, street adress, etc"
          {...register("address")}
          isInvalid={errors.address?.message ? true : false}
        />
        {!errors.address?.message && (
          <p style={{ opacity: "0.5" }}>
            Please ensure to provide a complete address (including apartment
            number, building name, and street addresses) in the provided address
            field to avoid delivery delays or order cancellations.
          </p>
        )}

        <Form.Control.Feedback type="invalid">
          {errors.address?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>REGION</Form.Label>
          <Form.Select
            disabled={!regions}
            isInvalid={!region}
            onChange={(event) => {
              const region = event.target.value || null;
              setRegion(region);
            }}
          >
            <option value={null}>Select</option>
            {regions &&
              regions.map((region, index) => (
                <option key={index} value={region.designation}>
                  {region.name}
                </option>
              ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please select a region
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>PROVINCE</Form.Label>
          <Form.Select
            disabled={!region}
            isInvalid={!province}
            ref={provinceRef}
            onChange={(event) => {
              const province = event.target.value || null;
              setProvince(province);
            }}
          >
            <option value={null}>Select</option>
            {provinces &&
              provinces.map((province, index) => (
                <option key={index} value={province.name}>
                  {province.name}
                </option>
              ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please select a province
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>MUNICIPALITY</Form.Label>
          <Form.Select
            disabled={!province}
            isInvalid={!municipality}
            ref={municipalityRef}
            onChange={(event) => {
              const municipality = event.target.value || null;
              setMunicipality(municipality);
            }}
          >
            <option value={null}>Select</option>
            {municipalities &&
              municipalities.map((municipality, index) => (
                <option key={index} value={municipality.name}>
                  {municipality.name}
                </option>
              ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please select a municipality
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>ZIP/POSTAL CODE</Form.Label>
          <Form.Control
            type="text"
            {...register("postalCode")}
            isInvalid={errors.postalCode?.message ? true : false}
          />
          <Form.Control.Feedback type="invalid">
            {errors.postalCode?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>CONTACT NUMBER</Form.Label>
          <Form.Control
            placeholder="+63-"
            type="text"
            {...register("phoneNumber")}
            isInvalid={errors.phoneNumber?.message ? true : false}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phoneNumber?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>ADD A LABEL</Form.Label>
        <Form.Control
          type="text"
          placeholder="Home, Office, etc"
          {...register("addressLabel")}
          isInvalid={errors.phoneNumber?.message ? true : false}
        />
        <Form.Control.Feedback type="invalid">
          {errors.addressLabel?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Button
        style={{
          width: "200px",
          height: "50px",
        }}
        variant="dark"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? <Spinner /> : "SAVE"}
      </Button>
    </Form>
  );
}

export default AddressForm;
