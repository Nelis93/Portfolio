import React from "react";
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { useForm, SubmitHandler } from "react-hook-form";
import { PageInfo } from "../../typings";

type Props = {
  pageInfo: PageInfo;
};
type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function Contact({ pageInfo }: Props) {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (formdata) => {
    window.location.href = `mailto:neliseerdekens1@gmail.com?subject=${formdata.subject}&body=${formdata.message} (${formdata.email})`;
  };

  return (
    <div className="h-screen max-w-screen flex relative text-left flex-row justify-center px-10 items-start">
      <h3 className="absolute top-[7vh] uppercase tracking-[20px] text-white text-[5vh]">
        Contact
      </h3>

      <div className="flex flex-col mt-[20vh] max-w-screen justify-start space-y-[5vh] ">
        {/* <h4 className="text-[5vh] font-semibold text-center">
          Details will be shared{" "}
          <span className="decoration-yellow-500/50 underline">
            soon{"(ish)"}
          </span>
        </h4> */}
        <div className="space-y-[2vh]">
          <div className="flex items-center space-x-5 justify-center">
            <PhoneIcon className="text-yellow-500 h-[3vh] w-[3vh] animate-pulse" />
            <p className="text-[3vh]">{pageInfo.phoneNumber}</p>
          </div>
          <div className="flex items-center space-x-5 justify-center">
            <EnvelopeIcon className="text-yellow-500 h-[3vh] w-[3vh] animate-pulse" />
            <p className="text-[3vh]">{pageInfo.email}</p>
          </div>
          <div className="flex items-center space-x-5 justify-center">
            <MapPinIcon className="text-yellow-500 h-[3vh] w-[3vh] animate-pulse" />
            <p className="text-[3vh]">{pageInfo.address}</p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-2 w-fit h-[20vh] text-[2vh] mx-auto"
        >
          <div className="flex space-x-2">
            <input
              {...register("name")}
              placeholder="Name"
              className="contactInput"
              type="text"
            />
            <input
              {...register("email")}
              placeholder="Email"
              className="contactInput"
              type="email"
            />
          </div>
          <input
            {...register("subject")}
            placeholder="Subject"
            className="contactInput"
            type="text"
          />
          <textarea
            {...register("message")}
            placeholder="Message"
            className="contactInput"
          />
          <button
            type="submit"
            className="bg-teal-500 py-[3vh] px-10 rounded-md text-white font-bold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}