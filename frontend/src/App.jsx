import Dashboard from "./pages/Dashboard"

function App() {

  const chat_history=[
    { role: "human", content: "hi" },
    { role: "ai", content: "hey, how can i Help you today?" },
  ]
  localStorage.setItem("history", chat_history)

  return (
    <>
      <Dashboard/>
    </>
  )
}

export default App
