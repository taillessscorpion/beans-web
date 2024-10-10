const LoadingSkeleton = () => {
    const delay = Math.random()
    return <div className="Loading-Skeleton" style={{animationDelay: `${delay}s`}}>
        
    </div>
}

export default LoadingSkeleton