import styled from "styled-components";
import Select from "react-select";
import { Label, LabelCommon } from "../App";
import { memo } from "react";
interface TopBarProps {
  onChange: (type: "COMPANY" | "BASE" | "LOCATION" | "ROLE" | "EXP", val: string | Label | LabelCommon) => void;
  roles: LabelCommon[];
  roleVal: LabelCommon;
  minExp: Label[];
  expVal: Label;
  locationArea: LabelCommon[];
  minBasePay: Label[];
  minBasePayVal: Label;
  companyNameSearch: string;
  locVal: LabelCommon;
}
const TopBarSkin = styled.div`
  justify-content: space-around;
  gap: 10px;
  flex-wrap: wrap;
  display: flex;
  padding: 10px;
  width: 100%;
`;
const InputText = styled.input`
  font-size: 15px;
  height: 31px;
`;

function TopBar(props: TopBarProps) {
  const {
    onChange,
    roles,
    roleVal,
    minExp,
    expVal,
    locationArea,
    minBasePay,
    minBasePayVal,
    companyNameSearch,
    locVal,
  } = props;
  return (
    <TopBarSkin>
      <Select
        isClearable
        options={roles}
        onChange={(newValue) => onChange("ROLE", newValue!)}
        value={roleVal}
        placeholder="Roles"
      />
      <Select
        isClearable
        options={minExp}
        onChange={(newValue) => onChange("EXP", newValue!)}
        value={expVal}
        placeholder="Experience"
      />
      <Select
        isClearable
        options={locationArea}
        onChange={(newValue) => onChange("LOCATION", newValue!)}
        value={locVal}
        placeholder="Location"
      />
      <Select
        isClearable
        options={minBasePay}
        onChange={(newValue) => onChange("BASE", newValue!)}
        value={minBasePayVal}
        placeholder="Min Base Pay"
      />
      <InputText
        value={companyNameSearch}
        onChange={(e: any) => onChange("COMPANY", e.target.value)}
        placeholder="Type Company Name"
      />
    </TopBarSkin>
  );
}
export default memo(TopBar)
