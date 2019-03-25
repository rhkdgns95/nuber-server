const privateResolver = resolverFunction => async(_, __, context, info) => {
    
    if(!context.req.user){  
        throw new Error("No User...");
    }    
    const resolved = await resolverFunction(_, __, context);
    return resolved;
}
export default privateResolver;