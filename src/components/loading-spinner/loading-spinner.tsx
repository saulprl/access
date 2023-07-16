export const LoadingSpinner = ({
  onBackground = false,
}: {
  onBackground?: boolean;
}) => {
  return (
    <span
      className={`inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-y-transparent ${
        onBackground ? "border-x-primary-700" : "border-x-white"
      } `}
    />
  );
};
