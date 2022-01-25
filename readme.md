# Dapr服务调用示例

以一个node.js应用为例，演示Dapr服务调用。

## 使用Dapr启动这个服务

服务代码包含在`app.js`文件中，返回一个简单的字符串。

```
dapr run --app-id service_invoke --app-port 3001 --dapr-http-port 3500 -- node app.js
```

* 应用ID（app-id）：`service_invoke`，服务的标识，后续调用服务的时候需要指定这个应用ID。
* 应用端口（app-port）：`3001`，**应用程序爆露的端口，这里的端口必须与应用程序指定的运行端口一致**。
* DaprHttp端口(dapr-http-port)：`3500`，Dapr API对外公布的端口。

中间的`--`分隔符后面的`node app.js`是Dapr运行的应用的启动命令。

## 测试调用服务

使用`dapr invoke`命令调用：

```
dapr invoke --app-id service_invoke --method test --verb GET 
Hello World!
App invoked successfully
```

使用Dapr API调用：

```
 curl http://localhost:3500/v1.0/invoke/service_invoke/method/test                     


StatusCode        : 200
StatusDescription : OK
Content           : Hello World!
RawContent        : HTTP/1.1 200 OK
                    Keep-Alive: timeout=5
                    Connection: keep-alive
                    Traceparent: 00-f119d9f753fd4cd81339dcaa003a75e6-c4373bedeb49af96-01
                    Content-Length: 12
                    Content-Type: text/html; charset=utf-8
                    Date: ...
Forms             : {}
Headers           : {[Keep-Alive, timeout=5], [Connection, keep-alive], [Traceparent, 00-f119d9f753fd4cd81339dcaa003a75e6-c43 
                    73bedeb49af96-01], [Content-Length, 12]...}
Images            : {}
InputFields       : {}
Links             : {}
ParsedHtml        : mshtml.HTMLDocumentClass
RawContentLength  : 12
```

## 使用JavaScript SDK调用Dapr服务

为了演示在Dapr调用服务的方法，我们再创建一个服务，位于`client.js`文件，这个服务将调用之前演示的服务。


启动服务：

```
dapr run --app-id client --app-port 3002 --dapr-http-port 3501 -- node client.js
```

调用服务：

```
dapr invoke --app-id client --method test-invoke --verb GET
repos is Hello World!
App invoked successfully
```

我们看到，返回值中包括从服务`service_invoke`返回的结果`Hello World!`。