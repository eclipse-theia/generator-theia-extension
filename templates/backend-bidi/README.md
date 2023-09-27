# Backend Communication Example

The example extension demonstrates how to communicate bidirectional with backend services. 
It contains the `HelloBackendWithClientService`, that issues a greeting but the name parameter is not directly passed by the client. Instead, the backend services retrieves the name to say "Hello" to from the client again (`BackendClient`). This example shows how to implement call backs from the backend to the client.
Further, the example contributes one command to trigger the backend call.

## How to use the backend communication example

In the running application, trigger the command "Say hello on the backend with a callback to the client" via the command palette (F1 => "Say Hello"). A message will be printed out on the console from where you launched the application.
