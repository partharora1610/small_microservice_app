### ErrImagePull, ErrImageNeverPull and ImagePullBackoff Errors

If your pods are showing ErrImagePull, ErrImageNeverPull, or ImagePullBackOff errors after running kubectl apply, the simplest solution is to provide an imagePullPolicy to the pod.

First, run **kubectl delete -f infra/k8s/**

Then, update your pod manifest:

spec:
containers: - name: posts
image: cygnet/posts:0.0.1
imagePullPolicy: Never
Then, run kubectl apply -f infra/k8s/

This will ensure that Kubernetes will use the image built locally from your image cache instead of attempting to pull from a registry.

#### Minikube Users:

If you are using a vm driver, you will need to tell Kubernetes to use the Docker daemon running inside of the single node cluster instead of the host.

Run the following command:
**eval $(minikube docker-env)**

Note - This command will need to be repeated anytime you close and restart the terminal
session.

Afterward, you can build your image:
**docker build -t USERNAME/REPO.**

Update, your pod manifest as shown above and then run:
**kubectl apply -f infra/k8s**
