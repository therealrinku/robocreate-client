import { Fragment, PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Fragment>
      <div className="max-w-[900px] mx-auto mt-20">{children}</div>
    </Fragment>
  );
}
