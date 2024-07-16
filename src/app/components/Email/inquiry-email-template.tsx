import * as React from "react";
import { TravelPackageDto } from "@/app/shared/models/travelPackageDto";

export interface InquiryEmailTemplateProps {
  name: string;
  email: string;
  contactNo: string;
  travelDates: string;
  noOfPax: string;
  message: string;
  inquiryDate: string;
  travelPackage: TravelPackageDto;
}

export const InquiryEmailTemplate: React.FC<
  Readonly<InquiryEmailTemplateProps>
> = (props: InquiryEmailTemplateProps) => (
  <div>
    <h1>
      Travel Inquiry for package: {props.travelPackage.name} (code :{" "}
      {props.travelPackage.code})
    </h1>
    <br />
    <h2>Customer details:</h2>
    <ul>
      <li>
        <b>Name</b>: {props.name}
      </li>
      <li>
        <b>Email</b>: {props.email}
      </li>
      <li>
        <b>Contact No</b>: {props.contactNo}
      </li>
    </ul>
    <h2>Travel details:</h2>
    <ul>
      <li>
        <b>Travel Package</b>: {props.travelPackage.name}
      </li>
      <li>
        <b>Travel Dates</b>: {props.travelDates}
      </li>
      <li>
        <b>No of People</b>: {props.noOfPax}
      </li>
      <li>
        <b>Message</b>: {props.message}
      </li>
      <li>
        <b>Time of inquiry</b>: {props.inquiryDate}
      </li>
    </ul>
  </div>
);
