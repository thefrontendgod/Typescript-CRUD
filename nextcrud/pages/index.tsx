import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useState, useEffect } from 'react'

const Home: NextPage = () => {
  const [data, setData] = useState([]);
  const [inputedData, setInputedData] = useState({
    title: "",
    content: ""
  });

  // using the console.log to check that it works 
  // console.log(inputedData);

  const fetchData = async () => {
    const response = await fetch(`/api/post/getdata`);
    const json = await response.json();
    // check the output to be suer it came out
    // console.log(json);
    // set for use
    setData(json);
  }

  // to submit the form
  const handleCreateData = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch(`/api/post/createdata`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: inputedData.title,
        content: inputedData.content,
      }),
    })
    const json = await response.json()
  }

  const handleDeleteData = async(id: string) => {
    // check to be sure the id is picked by the const
    // console.log(id);
    const response = await fetch(`/api/post/deletedata`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
    const json = await response.json()
    console.log(json)
    fetchData()
  }

  // after fetching data, to use the data we use the useEffect
  useEffect(() => {
    // we invoke the fetchdata const from the above
    fetchData()
  })

  return (
    <div>
      <Head>
        <title>CRUD!</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>NEXT CRUD!</h1>
      <div>
        <form onSubmit={handleCreateData}>
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setInputedData({ ...inputedData, title: e.target.value})}
          />
          <input
            type="text"
            placeholder="Content"
            onChange={(e) => setInputedData({ ...inputedData, content: e.target.value})}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        {data.map(({id, title, content}) => {
          return(
            <div key={id}>
              <h3>Title: {title}</h3>
              <p>Content: {content}</p>
              <button onClick={() => handleDeleteData(id)}>Delete Data</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home
