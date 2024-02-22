provider "aws" {
  region = "us-east-1"
}

terraform {
  required_version = ">= 0.12.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.34.0"
    }

    archive = {
      source  = "hashicorp/archive"
      version = "2.2.0"
    }
    local = {
      source  = "hashicorp/local"
      version = "2.1.0"
    }
    null = {
      source  = "hashicorp/null"
      version = "3.1.0"
    }
  }
}