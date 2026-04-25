"use client";
import { store } from "@/src/state/redux/store";
import { Provider } from "react-redux";
export default function StateWraper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Provider store={store}>{children}</Provider>
    </div>
  );
}
