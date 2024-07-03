import {TravelPackageDto} from "@/app/shared/models/travelPackageDto";
import {useDisclosure} from '@mantine/hooks';
import {Modal, Button, Group, ButtonVariant, TextInput, Select, Textarea} from '@mantine/core';
import React from "react";
import {isEmail, isNotEmpty, useForm} from "@mantine/form";
import {formatDateRange} from "@/app/util/Helpers";
import {notifications} from "@mantine/notifications";

interface InquiryModalProps {
    travelPackage: TravelPackageDto;
    children?: React.ReactNode;
    variant?: string | ButtonVariant
}

const InquiryModalButton = ({travelPackage, children, variant}: InquiryModalProps) => {
    const [opened, {close, open}] = useDisclosure(false);
    const travelDatesOptions = Array.from(new Set(travelPackage.travelDates.map(td => formatDateRange(td))));
    const noOfPeopleOptions = new Array(15).fill(null).map((_, i) => `${i + 1}`);
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            contactNo: '',
            travelDates: travelDatesOptions[0],
            noOfPax: '',
            message: '',
        },

        validate: {
            email: isEmail('Invalid email'),
            contactNo: isNotEmpty(),
            noOfPax: isNotEmpty(),
            message: isNotEmpty(),
        },
    });

    const inquireUsForm = <form onSubmit={form.onSubmit((values) => {
        notifications.show({
            id: 'inquiry-notif',
            withCloseButton: true,
            title: `Inquiry Sent: ${travelPackage.name}`,
            message: `Hey there, we received your inquiry about ${travelPackage.name} and we will respond to you soon!`,
            color: 'green',
            autoClose: 3000,
        });
        // save values here
        form.reset();
        close();
    })}>
        <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            key={form.key('email')}
            {...form.getInputProps('email')}
        />

        <TextInput
            mt="sm"
            withAsterisk
            label="Contact Number"
            key={form.key('contactNo')}
            {...form.getInputProps('contactNo')}
        />

        <Select
            mt="sm"
            withAsterisk
            label="Travel Dates"
            placeholder="Pick travel dates"
            data={travelDatesOptions}
            key={form.key('travelDates')}
            {...form.getInputProps('travelDates')}
            required
        />

        <Select
            mt="sm"
            withAsterisk
            label="Number of people"
            placeholder="How many people are going?"
            data={[...noOfPeopleOptions, `${noOfPeopleOptions.length + 1} +`]}
            key={form.key('noOfPax')}
            {...form.getInputProps('noOfPax')}
            required
        />

        <Textarea
            mt="sm"
            withAsterisk
            label="Travel details"
            description="Tell us more about your trip. How many people? When? We can customize based on your needs"
            key={form.key('message')}
            {...form.getInputProps('message')}
            radius={"sm"}
        />

        <Group justify="flex-end" mt="md">
            <Button type="submit">Send</Button>
        </Group>
    </form>
    return (
        <>

            <Modal
                opened={opened}
                onClose={close}
                title="Book your trip with us!"
                radius={10}
                transitionProps={{transition: 'fade', duration: 200}}
                centered
            >
                {inquireUsForm}
            </Modal>

            <Button variant={variant ?? "primary"} onClick={open}>{children}</Button>
        </>)
}

export default InquiryModalButton;