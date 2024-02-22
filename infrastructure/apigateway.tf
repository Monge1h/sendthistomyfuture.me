resource "aws_apigatewayv2_api" "main" {
  name          = "sendthistomyfutureme-api"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_stage" "stage" {

  api_id = aws_apigatewayv2_api.main.id
  name   = "prod"

  auto_deploy = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.lambda_log_group.arn

    format = jsonencode({
      requestId        = "$context.requestId",
      ip               = "$context.identity.sourceIp",
      user             = "$context.identity.user",
      requestTime      = "$context.requestTime",
      httpMethod       = "$context.httpMethod",
      routeKey         = "$context.routeKey",
      statusCode       = "$context.status",
      responseLength   = "$context.responseLength"
      integrationError = "$context.integrationErrorMessage"
      source           = "apigateway"
      protocol         = "$context.protocol",
    })
  }
}

resource "aws_apigatewayv2_integration" "integration" {
  api_id             = aws_apigatewayv2_api.main.id
  integration_method = "POST"
  integration_type   = "AWS_PROXY"
  integration_uri    = aws_lambda_function.sendthistomyfutureme-lambda.invoke_arn
}

resource "aws_apigatewayv2_route" "proxy" {
  api_id    = aws_apigatewayv2_api.main.id
  route_key = "ANY /{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.integration.id}"
}

