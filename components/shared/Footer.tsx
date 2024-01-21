import AppIcon from "./AppIcon"

const Footer = () => {
  return (

    <footer className="border-t">
      <div className="flex flex-center flex-col gap-4 p-5
            sm:flex-row flex-between w-full text-center wrapper">
         <AppIcon/>
        <p>
          2024 Evently. All Rights Reserved.
        </p>
      </div >
    </footer>

  )
}

export default Footer