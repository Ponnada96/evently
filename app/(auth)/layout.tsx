const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex-center min-h-screen w-full
         bg-gradient-to-r from-indigo-700">
            {children}
        </div>)
}
export default layout