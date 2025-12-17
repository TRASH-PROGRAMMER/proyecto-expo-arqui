# Carpeta .serverless

Esta carpeta es generada automáticamente por el **Serverless Framework** durante el proceso de deployment. Contiene información sobre el estado actual del despliegue y los templates de CloudFormation utilizados.

## ⚠️ Importante

- **NO editar estos archivos manualmente** - Son generados automáticamente
- **NO incluir en Git** - Esta carpeta debe estar en `.gitignore`
- Se regenera cada vez que ejecutas `serverless deploy`

## 📁 Archivos

### `serverless-state.json`
**Estado completo del deployment**

Contiene toda la información del último despliegue exitoso:
- Configuración del servicio (`qrgen-serverless`)
- Template de CloudFormation compilado
- Recursos AWS creados (Lambda, API Gateway, IAM Roles, Log Groups)
- ARNs y configuraciones de las funciones Lambda
- Endpoints de API Gateway
- Versiones y hashes de las funciones

**Uso:** El framework usa este archivo para determinar qué cambios aplicar en el próximo deploy (deployment incremental).

### `meta.json`
**Metadata del proyecto y deployment**

Información detallada sobre:
- Versión del Serverless Framework utilizada (`4.28.0`)
- Ruta del proyecto y archivo de configuración
- Template de CloudFormation completo
- Configuración del provider (AWS, región, stage)
- Plugins utilizados (serverless-esbuild, serverless-offline)
- Variables de entorno y configuraciones custom

**Uso:** Tracking del estado del proyecto y metadatos necesarios para operaciones del framework.

### `cloudformation-template-update-stack.json`
**Template de AWS CloudFormation**

Template generado para actualizar el stack de CloudFormation en AWS. Define todos los recursos de infraestructura:

**Recursos principales:**
- **ApiLogGroup**: CloudWatch Log Group para logs de Lambda
- **IamRoleLambdaExecution**: Rol IAM con permisos para la función Lambda
- **ApiLambdaFunction**: Función Lambda con el código desplegado
- **ApiLambdaVersion**: Versiones de la función Lambda
- **HttpApi**: API Gateway HTTP API
- **HttpApiIntegration**: Integración entre API Gateway y Lambda
- **ApiLambdaPermissionHttpApi**: Permisos para que API Gateway invoque Lambda

**Uso:** AWS CloudFormation usa este template para crear/actualizar la infraestructura en cada deploy.

## 🔄 Proceso de Deployment

Cuando ejecutas `npm run deploy` o `serverless deploy`:

1. **Compilación**: Serverless compila tu código TypeScript con esbuild
2. **Generación de templates**: Crea los templates de CloudFormation basados en `serverless.yml`
3. **Empaquetado**: Empaqueta el código en un archivo ZIP
4. **Upload a S3**: Sube el paquete al bucket de deployment de AWS
5. **CloudFormation**: Ejecuta/actualiza el stack de CloudFormation
6. **Generación de archivos**: Crea/actualiza los archivos en `.serverless/`
7. **Salida**: Muestra endpoints y estado del deployment

## 📊 Información útil

Para ver información del deployment actual:
```bash
serverless info
```

Para ver los logs de la función:
```bash
serverless logs -f api -t
```

Para eliminar el deployment:
```bash
serverless remove
```

## 🔍 Stack actual

**Service:** qrgen-serverless  
**Stage:** dev  
**Region:** us-east-1  
**Stack:** qrgen-serverless-dev

**Recursos desplegados:**
- Lambda Function: `qrgen-serverless-dev-api`
- API Gateway: `https://54ujz2tmj7.execute-api.us-east-1.amazonaws.com`
- Log Group: `/aws/lambda/qrgen-serverless-dev-api`
- IAM Role: Permisos para Lambda execution y CloudWatch logs

---

**Generado por:** Serverless Framework v4.28.0  
**Última actualización:** Diciembre 16, 2025
