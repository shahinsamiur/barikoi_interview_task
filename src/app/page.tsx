"use client";
import { toast } from "react-toastify";
import { Button } from "@/src/utils";
import { ContainerWraper } from "@/src/utils";

export default function page() {
  return (
    <ContainerWraper>
      <div className="min-h-screen">
        <h1>hello samiur shahin</h1>
        <Button onClick={() => toast.success("some one clicked me ")}>
          click me
        </Button>
      </div>
    </ContainerWraper>
  );
}
