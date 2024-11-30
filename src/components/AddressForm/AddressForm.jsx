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
import { useNavigate } from "react-router-dom";

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  postalCode: z.coerce
    .number({
      required_error: "Postal Code is required",
      invalid_type_error: "Postal Code must be a number",
    })
    .refine(
      (val) => `${val}`.length === 4,
      "Postal Code must be 4 digits long"
    ),
  addressLabel: z
    .string()
    .min(1, "Address label is required")
    .max(50, "Address label must be less than 50 characters"),
  phoneNumber: z.coerce
    .number({
      required_error: "Phone Number is required",
      invalid_type_error: "Phone Number must not contain letters",
    })
    .refine((val) => `${val}`.length === 10, "Phone Number must be valid"),
});

function AddressForm({ defaultValues, onSubmit, isLoading }) {
  const [regions, setRegions] = useState(getRegions());
  const [provinces, setProvinces] = useState(
    defaultValues ? getProvinces(defaultValues.region) : null
  );
  const [municipalities, setMunicipalities] = useState(
    defaultValues ? getMunicipalities(defaultValues.province) : null
  );

  const [isDefaultSet, setIsDefaultSet] = useState(false);

  const [region, setRegion] = useState(defaultValues?.region || null);
  const [province, setProvince] = useState(defaultValues?.province || null);
  const [municipality, setMunicipality] = useState(
    defaultValues?.municipality || null
  );

  const regionRef = useRef();
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

  const navigate = useNavigate();

  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  useEffect(() => {
    if (
      defaultValues &&
      regions &&
      provinces &&
      municipalities &&
      !isDefaultSet
    ) {
      const ri = regions.map((r) => r.name).indexOf(defaultValues.region) + 1;
      const pi =
        provinces.map((p) => p.name).indexOf(defaultValues.province) + 1;
      const mi =
        municipalities.map((m) => m.name).indexOf(defaultValues.municipality) +
        1;

      regionRef.current.selectedIndex = ri;
      provinceRef.current.selectedIndex = pi;
      municipalityRef.current.selectedIndex = mi;

      setIsDefaultSet(true);
    }
  }, [regions, provinces, municipalities]);

  useEffect(() => {
    if (defaultValues && !isDefaultSet) return;

    setProvince(null);
    setMunicipalities(null);
    provinceRef.current.selectedIndex = 0;
    municipalityRef.current.selectedIndex = 0;

    if (region) {
      setProvinces(getProvinces(region));
    }
  }, [region]);

  useEffect(() => {
    if (defaultValues && !isDefaultSet) return;

    setMunicipality(null);
    municipalityRef.current.selectedIndex = 0;

    if (province) {
      setMunicipalities(getMunicipalities(province));
    }
  }, [province]);

  const handleFormSubmit = async (data) => {
    if (!region || !province || !municipality) {
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
    navigate("/address");
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
            ref={regionRef}
          >
            <option value={""}>Select</option>
            {regions &&
              regions.map((region, index) => (
                <option key={index} value={region.name}>
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
            <option value={""}>Select</option>
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
            <option value={""}>Select</option>
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
          isInvalid={errors.addressLabel?.message ? true : false}
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
