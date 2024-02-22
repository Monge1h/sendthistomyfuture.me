resource "aws_cloudwatch_log_group" "lambda_log_group" {
  name = "/aws/lambda/${aws_lambda_function.sendthistomyfutureme-lambda.function_name}"

  retention_in_days = 14
}

resource "aws_cloudwatch_log_group" "api_log_group" {
  name = "/aws/api_gateway/${aws_apigatewayv2_api.main.name}"

  retention_in_days = 14
}