import React from "react";
import styled from "styled-components";
import { memo } from "react";
interface CardProps {
  onClickEasyApply?: React.MouseEventHandler<HTMLButtonElement>;
  onClickUnlockReffralinks?: React.MouseEventHandler<HTMLButtonElement>;
  days?: number;
  companyName?: string;
  jobRole?: string;
  location?: string;
  maxJdSalary?: number;
  minJdSalary?: number;
  minExp?: number;
  jobDesc: string;
  jdLink: string;
  logoUrl?: string;
}
const CustomButton = styled.button<{ isprimary?: boolean }>`
  background-color: ${(props) => (props.isprimary ? "#5debd7" : "#10439f")};
  color: ${(props) => (props.isprimary ? "black" : "white")};
  border-radius: 5px;
  border: none;
  height: 40px;
  margin-top: 5px;
  cursor: pointer;
`;
const MainCon = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px;
  min-width: 150px;
  max-width: 270px;
  border: 1px solid black;
  border-radius: 5px;
  max-height: 450px;
`;
const ChipCon = styled.div`
  width: 100%;
  display: flex;
`;
const Chip = styled.div`
  width: auto;
  border-radius: 3px;
  border: 1px solid black;
  font-size: 12px;
  padding: 0px 7px;
`;
const CompData = styled.div`
  display: flex;
`;
const JobData = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 5px;
`;
const Footer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -55px;
`;
const JobDesc = styled.div`
  height: 250px;
  overflow: hidden;
  text-align: left;
`;

const ExpericeSkin = styled.div`
  font-size: 12px;
  height: 12px;
  text-align: left;
  background: white;
`;
const ExpericeYearSkin = styled.div`
  height: 15px;
  font-size: 15px;
  text-align: left;
  background: white;
`;
const GradientSkin = styled.div`
  background: linear-gradient(180deg, transparent, white);
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: end;
`;

function Card(props: CardProps) {
  const {
    onClickEasyApply,
    onClickUnlockReffralinks,
    days,
    companyName,
    jobRole,
    location,
    minJdSalary,
    maxJdSalary,
    minExp,
    jobDesc,
    jdLink,
    logoUrl,
  } = props;
  return (
    <MainCon>
      {days && (
        <ChipCon>
          <Chip>Posted {days} days ago</Chip>
        </ChipCon>
      )}
      <CompData>
        <img src={logoUrl} alt="No Image" height="50px" loading="lazy" />
        <JobData>
          <div style={{ fontSize: "13px", textAlign: "left" }}>
            {companyName}
          </div>
          <div style={{ fontSize: "15px", textAlign: "left" }}>{jobRole}</div>
          <div style={{ fontSize: "10px", textAlign: "left" }}>{location}</div>
        </JobData>
      </CompData>
      {minJdSalary && (
        <div style={{ textAlign: "left" }}>
          Expected Salary ₹{minJdSalary} to {maxJdSalary} LPA ✅
        </div>
      )}
      <div style={{ fontSize: "20px", textAlign: "left" }}>About Company</div>
      <JobDesc>{jobDesc}</JobDesc>
      <Footer>
        <GradientSkin>
          <a
            href={jdLink}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            View Job
          </a>
        </GradientSkin>
        <div>
          {
            <>
              <ExpericeSkin>{minExp && "Minimum Experience"}</ExpericeSkin>
              <ExpericeYearSkin>
                {" "}
                {minExp} {minExp && "years"}
              </ExpericeYearSkin>
            </>
          }
        </div>
        <CustomButton isprimary onClick={onClickEasyApply}>
          ⚡ Easy Apply
        </CustomButton>
        <CustomButton onClick={onClickUnlockReffralinks} >
          Unlock Reffral Links
        </CustomButton>
      </Footer>
    </MainCon>
  );
}

export default memo(Card);
