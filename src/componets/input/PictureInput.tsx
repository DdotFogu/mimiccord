import SelectableAvatar from "../user/SelectableAvatar.tsx";

type InputProps = {
  size?: number;
  pfp: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const PictureInput = ({ size, pfp, onChange }: InputProps) => {
  return (
    <>
      <input
        id="pfp-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onChange(e)}
      />
      <SelectableAvatar
        size={size}
        pfp={pfp}
        title={"Change"}
        htmlFor={"pfp-upload"}
      />
    </>
  );
};

export default PictureInput;
