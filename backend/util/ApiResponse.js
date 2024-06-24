class ApiResponse {
  constructor(statusCode, data, message = "Successfully done") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

const basicStart = async(id , model, res)=>{
  if(!id) return res.json(new ApiResponse(404 , `Id required`));
  const data = await model.findById(id);
  if(!data) return res.json(new ApiResponse(404 , 'Not Found'))
  return data


}

export { ApiResponse , basicStart };