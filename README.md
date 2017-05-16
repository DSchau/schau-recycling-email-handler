# email-handler

The lamda function used to send e-mails from my personal website

## Install

1. Clone this repo
1. `yarn`

## Usage

### `yarn start`

To develop locally, and mimic a remote AWS trigger, use `yarn start`, which will spin up an offline serverless instance largely analagous to a real lamda function

### `yarn deploy`

Use `yarn deploy` to deploy to production AWS

Other commands:

- `yarn deploy:dev`
 - Deploys to staged development servers
