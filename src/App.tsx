import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import "./App.css";
import Card from "./Component/Card";
import styled from "styled-components";
import cloneDeep from "lodash/cloneDeep";
import TopBar from "./Component/TopBar";
const api = "https://api.weekday.technology/adhoc/getSampleJdJSON";
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
interface JdInterface {
  jdLink: string;
  jdUid: string;
  jobDetailsFromCompany: string;
  jobRole: string;
  location?: string;
  maxExp?: number;
  maxJdSalary?: number;
  minExp: number;
  minJdSalary?: number;
  salaryCurrencyCode?: string;
  companyName: string;
  logoUrl?: string;
}
interface Statedata {
  totalCount: number;
  jdList: JdInterface[];
}
const GridCon = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 10px;
  height: 100%;
  margin: 10px;
  justify-content: center;
`;

export interface Label {
  value: number;
  label: string;
}
export interface LabelCommon {
  value: string;
  label: string;
}

function customIncludes(
  array: Label[] | LabelCommon[],
  value: number | string
) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].value === value) {
      return true;
    }
  }
  return false;
}

function App() {
  const [data, setdata] = useState<Statedata>({
    totalCount: 1,
    jdList: [],
  });
  const [visData, setVisDatadata] = useState<Statedata>({
    totalCount: 0,
    jdList: [],
  });

  const [minExp, setMinExp] = useState<Label[]>([]);
  const [minBasePay, setMinBasePay] = useState<Label[]>([]);
  const [locationArea, setLocationArea] = useState<LabelCommon[]>([]);
  const [roles, setRoles] = useState<LabelCommon[]>([]);
  const [expVal, setExpVal] = useState<Label>();
  const [locVal, setLocVal] = useState<LabelCommon>();
  const [roleVal, setRoleVal] = useState<LabelCommon>();
  const [minBasePayVal, setMinBasePayVal] = useState<Label>();
  const [isApiCalling, setApiCalling] = useState(false);
  const [isToSetWithFilter, setIsToSetWithFilter] = useState(false);
  const [companyNameSearch, setCompanyNameSearch] = useState("");
  const onChange = useCallback((type: "COMPANY" | "BASE" | "LOCATION" | "ROLE" | "EXP", val: string | Label | LabelCommon)=>{
    setIsToSetWithFilter(true);
    switch (type){
      case "COMPANY":
        setCompanyNameSearch(val as string)
        break;
      case "BASE":
        setMinBasePayVal(val as Label)
        break;
      case "LOCATION":
        setLocVal(val as LabelCommon)
        break;
      case "ROLE":
        setRoleVal(val as LabelCommon)
        break;
      case "EXP":
        setExpVal(val as Label)
    }
  },[])

  useEffect(() => {
    if ((!isApiCalling || isToSetWithFilter) && data.totalCount !== 0) {
      let toset: Statedata = cloneDeep(data);
      if (companyNameSearch) {
        toset.jdList = toset.jdList.filter((ele) =>
          ele.companyName
            .toLowerCase()
            .includes(companyNameSearch.toLowerCase())
        );
      }
      if (expVal) {
        toset.jdList = toset.jdList.filter((ele) => ele.minExp <= expVal.value);
      }
      if (locVal) {
        toset.jdList = toset.jdList.filter(
          (ele) => ele.location === locVal.value
        );
      }
      if (minBasePayVal) {
        toset.jdList = toset.jdList.filter(
          (ele) => ele.minJdSalary && ele.minJdSalary >= minBasePayVal.value
        );
      }
      if (roleVal) {
        toset.jdList = toset.jdList.filter(
          (ele) => ele.jobRole === roleVal.value
        );
      }

      setVisDatadata(toset);
      setIsToSetWithFilter(false);
    }
  }, [isApiCalling, isToSetWithFilter]);

  const pageCntRef = useRef(0);
  const scroolRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (isIntersecting && data.jdList.length < data.totalCount) {
      const body = JSON.stringify({
        limit: 10,
        offset: pageCntRef.current,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body,
      };
      setApiCalling(true);
      fetch(api, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          const res: Statedata = JSON.parse(result);
            setdata((prev) => {
              const newData = {
                totalCount: res.totalCount,
                jdList: [...prev.jdList, ...res.jdList],
              };
              return newData;
            });
            setMinExp((prev) => {
              const newMinExp = res.jdList.reduce((acc, ele) => {
                const eleAdd = {
                  value: ele.minExp,
                  label: "< " + ele.minExp,
                };
                if (ele.minExp !== null && !customIncludes(acc, ele.minExp))
                  return [...acc, eleAdd];
                else return acc;
              }, prev);
              return newMinExp.sort((a, b) => a.value - b.value);
            });
            setLocationArea((prev) => {
              const newLoc = res.jdList.reduce((acc, ele) => {
                const eleAdd = {
                  value: ele.location!,
                  label: ele.location!,
                };
                if (
                  ele.location !== null &&
                  !customIncludes(acc, ele.location!)
                )
                  return [...acc, eleAdd];
                else return acc;
              }, prev);
              return newLoc;
            });
            setMinBasePay((prev) => {
              const newMinExp = res.jdList.reduce((acc, ele) => {
                const eleAdd = {
                  value: ele.minJdSalary!,
                  label: `${ele.minJdSalary} ${
                    ele.salaryCurrencyCode || "INR"
                  }`,
                };
                if (
                  ele.minJdSalary !== null &&
                  !customIncludes(acc, ele.minJdSalary!)
                )
                  return [...acc, eleAdd];
                else return acc;
              }, prev);
              return newMinExp.sort((a, b) => a.value - b.value);
            });
            setRoles((prev) => {
              const newRole = res.jdList.reduce((acc, ele) => {
                const eleAdd = {
                  value: ele.jobRole!,
                  label: ele.jobRole!,
                };
                if (ele.jobRole !== null && !customIncludes(acc, ele.jobRole!))
                  return [...acc, eleAdd];
                else return acc;
              }, prev);
              return newRole;
            });
          setApiCalling(false);
          pageCntRef.current++;
        })
        .catch((error) => console.error(error));
    }
  }, [isIntersecting]);

  useLayoutEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting)
      },
      options
    );
    observer.observe(scroolRef.current!);
    return () => observer.disconnect();
  }, []);
  const onClickBtns = useCallback((url : string)=>{
    window.open(url, "_blank", "noreferrer");
  },[])
  

  return (
    <div className="App">
      <TopBar
        onChange={onChange}
        roles={roles}
        roleVal={roleVal!}
        minExp={minExp}
        expVal={expVal!}
        locationArea={locationArea}
        minBasePay={minBasePay}
        minBasePayVal={minBasePayVal!}
        companyNameSearch={companyNameSearch}
        locVal={locVal!}
      />
      <GridCon>
        {visData?.jdList.length ?
          visData?.jdList?.map((ele, jobId) => (
            <Card
              logoUrl={ele.logoUrl}
              companyName={ele.companyName}
              location={ele.location}
              key={jobId}
              onClickEasyApply={() => onClickBtns(ele.jdLink)} // opening jd links since no funcitonlity was specified
              onClickUnlockReffralinks={() => onClickBtns(ele.jdLink)} // opening jd links since no funcitonlity was specified
              jobDesc={ele.jobDetailsFromCompany}
              jobRole={ele.jobRole}
              jdLink={ele.jdLink}
              minJdSalary={ele.minJdSalary}
              maxJdSalary={ele.maxJdSalary}
              minExp={ele.minExp}
            />
          )) : !isApiCalling && <div>No Job of such Category</div>}
      </GridCon>
      {isApiCalling && <div>Loading...</div>}
      <div ref={scroolRef}></div>
    </div>
  );
}

export default App;