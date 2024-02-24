interface Props {
  logoOnly?: boolean;
  noSubtitle?: boolean;
}

export default function Logo({ logoOnly, noSubtitle }: Props) {
  return (
    <div className="flex items-center gap-2">
      <img
        className="h-10 w-10"
        src="https://camo.githubusercontent.com/e9c1d8b7beb6f26cefc5ab0742b592df1abb0ceb398ee74c1ce33028460b3d9b/68747470733a2f2f63646e2d69636f6e732d706e672e666c617469636f6e2e636f6d2f3132382f31323433352f31323433353233342e706e67"
      />

      {!logoOnly && (
        <div className="hidden lg:block">
          <p className="font-bold">Robocreate</p>

          {!noSubtitle && (
            <p className="italic text-xs">
              your new <span className="font-bold">social media manager</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
