import type { NextPage } from "next";
import { useEffect } from "react";
import { useQuery } from "react-query";
import client from "../client";

async function test() {
  return client.get("/test");
}

async function test2() {
  return client.get("/test2");
}

async function test3() {
  return client.get("/test3");
}

const Home: NextPage = () => {
  const { data: testData } = useQuery("test", test);
  const { data: testData2 } = useQuery("test2", test2);
  const { data: testData3 } = useQuery("test3", test3);

  return (
    <div>
      <p>테스트1 데이터 : {JSON.stringify(testData)}</p>
      <p>테스트2 데이터 : {JSON.stringify(testData2)}</p>
      <p>테스트3 데이터 : {JSON.stringify(testData3)}</p>
    </div>
  );
};

export default Home;
