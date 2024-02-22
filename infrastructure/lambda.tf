resource "aws_iam_role" "lambda_role" {
  name               = "sendthistomyfutureme-lambda-role"
  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
	{
	  "Action": "sts:AssumeRole",
	  "Principal": {
		"Service": "lambda.amazonaws.com"
	  },
	  "Effect": "Allow",
	  "Sid": ""
	}
  ]
  }
  POLICY
}

resource "aws_iam_role_policy_attachment" "lambda_role_policy" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  role       = aws_iam_role.lambda_role.name
}

# tempory local files to create a zip file
resource "local_file" "hello_world" {
  filename = "${path.module}/hello_world.js"
  content  = <<EOF
exports.handler = async (event) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello World!'),
    };
    return response;
};
EOF
}

data "archive_file" "lambda_zip" {
  type        = "zip"
  source_file = local_file.hello_world.filename
  output_path = "/tmp/hello_world.zip"
}

resource "aws_lambda_function" "sendthistomyfutureme-lambda" {
  function_name = "sendthistomyfutureme-lambda"
  role          = aws_iam_role.lambda_role.arn
  handler       = "lambda.handler"
  runtime       = "nodejs18.x"

  filename = data.archive_file.lambda_zip.output_path

  lifecycle {
    ignore_changes = [filename]
  }
}

resource "null_resource" "remove_file" {
  depends_on = [data.archive_file.lambda_zip, aws_lambda_function.sendthistomyfutureme-lambda]
  provisioner "local-exec" {
    command = "rm ./${local_file.hello_world.filename} && rm /tmp/empty.zip"
  }
}