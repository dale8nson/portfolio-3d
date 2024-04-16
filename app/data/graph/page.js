"use client";
import request, { gql } from "graphql-request";
import Plot from "react-plotly.js";
import { TableSkeleton } from '/components/TableSkeleton'


import { useQuery, useMutation } from "@tanstack/react-query";

export default function Graph() {
  const query = gql`
    query cases {
      cases {
        recordId
        date {
          day
          month
          year
        }
        population
        vaccinated
        unvaccinated
        deaths
        vaccinatedDeaths
        unvaccinatedDeaths
      }
    }
  `;

  const { data, error, loading, isPending } = useQuery({
    queryKey: ["cases"],
    queryFn: async () => request("/api/graphql", query),
  });

  console.log("DataTable graphql query data: ", data?.cases);

  let cases;
  let sortedCases = [];
  let pop = [];
  let formattedCases = [];
  if (data) {
    cases = data.cases;

    for (let i = 0; i < cases.length; i++) {
      let {
        _id,
        recordId,
        date,
        population,
        vaccinated,
        unvaccinated,
        deaths,
        vaccinatedDeaths,
        unvaccinatedDeaths,
      } = cases[i];

      const { day, month, year } = date;
      date = new Date(year, month - 1, day).toLocaleDateString();

      formattedCases.push({
        _id,
        recordId,
        date,
        population,
        vaccinated,
        unvaccinated,
        deaths,
        vaccinatedDeaths,
        unvaccinatedDeaths,
      });

      sortedCases = cases.toSorted((c1, c2) =>
        c1.year < c2.year
          ? -1
          : c1.month < c2.month
            ? -1
            : c1.day < c2.day
              ? -1
              : 1
      );

      console.log("sorted cases: ", sortedCases);

      pop = sortedCases.map((c) => c.population);
    }
  }

  if(isPending) return <TableSkeleton />
  if(loading) return <TableSkeleton />
  

  return (
    <div className="h-screen w-screen flex">
      <Plot
        data={[
          {
            x: sortedCases.map((c, index) =>
              new Date(
                c.date.year,
                c.date.month,
                c.date.day
              ).toLocaleDateString()
            ),

            y: pop,

            type: "line",

            mode: "lines+markers",

            marker: { color: "gray" },
          },
          {
            x: sortedCases.map((c, index) =>
              new Date(
                c.date.year,
                c.date.month,
                c.date.day
              ).toLocaleDateString()
            ),

            y: sortedCases.map((c) => c.vaccinated),

            type: "line",

            mode: "lines+markers",

            marker: { color: "green" },
          },
          {
            x: sortedCases.map((c, index) =>
              new Date(
                c.date.year,
                c.date.month,
                c.date.day
              ).toLocaleDateString()
            ),

            y: sortedCases.map((c) => c.unvaccinated),

            type: "line",

            mode: "lines+markers",

            marker: { color: "red" },
          },
          {
            x: sortedCases.map((c, index) =>
              new Date(
                c.date.year,
                c.date.month,
                c.date.day
              ).toLocaleDateString()
            ),

            y: sortedCases.map((c) => c.deaths),

            type: "line",

            mode: "lines+markers",

            marker: { color: "black" },
          },
          {
            x: sortedCases.map((c, index) =>
              new Date(
                c.date.year,
                c.date.month,
                c.date.day
              ).toLocaleDateString()
            ),

            y: sortedCases.map((c) => c.vaccinatedDeaths),

            type: "line",

            mode: "lines+markers",

            marker: { color: 0x009900 },
          },
          {
            x: sortedCases.map((c, index) =>
              new Date(
                c.date.year,
                c.date.month,
                c.date.day
              ).toLocaleDateString()
            ),

            y: sortedCases.map((c) => c.unVaccinatedDeaths),

            type: "line",

            mode: "lines+markers",

            marker: { color: 0x339900 },
          },
        ]}
        layout={{
          width: 1024,
          height: 720,
          title:
            "Rates of COVID deaths among vaccinated and unvaccinated compared to vaccination rates in the NSW population",
        }}
      />
   
    </div>
  )
}



  //  /* <div className="h-screen w-screen flex-col mx-auto w-[10vw]">
  //       <Button>
  //         <Link href="/data/form">FORM</Link>
  //       </Button>
  //       <Button>
  //         <Link href="/data/graph">GRAPH</Link>
  //       </Button>
  //       <Button>
  //         <Link href="/home">BACK</Link>
  //       </Button>
  //     </div> */}