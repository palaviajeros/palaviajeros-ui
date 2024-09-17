import * as React from "react";
import { Tour } from "@/app/shared/domain/tour";
import { PackageType } from "@/app/shared/domain/packageType";

export interface InquiryEmailTemplateProps {
  name: string;
  email: string;
  contactNo: string;
  travelDates: string;
  noOfPax: string;
  message: string;
  inquiryDate: string;
  travelPackageType: PackageType;
  tour: Tour;
}

export const InquiryEmailTemplate: React.FC<Readonly<InquiryEmailTemplateProps>> = (props: InquiryEmailTemplateProps) => (
  <div>
    <h1>
      Travel Inquiry for package: {props.tour.name} (code : {props.tour.code})
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
        <b>Type</b>: {PackageType[props.travelPackageType]}
      </li>
      <li>
        <b>Travel Package</b>: {props.tour.name}
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
