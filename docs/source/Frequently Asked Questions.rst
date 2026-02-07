.. __Frequently Asked Questions: 
 
Frequently Asked Questions
====================

.. admonition:: Q. Why does the code not seem to work as well as expected after attaching the shovel?
   :class: note

   **A.** Installing the shovel will take up space for the ultrasonic and I2C interfaces, making it impossible to use ultrasonic and I2C related functions, and it will also increase the weight. You will need to adjust the speed parameters in the code to adapt to the new load conditions.

----

.. admonition:: Q. Are the codes for MicroBit V1.5 and V2 versions compatible?
   :class: tip

   **A.** It's generally compatible, but there may be some differences in performance. Please refer to Micro:bit's official documentation for details.

----

.. admonition:: Q. What should I do if the makecode program link used in the course is broken?
   :class: warning

   **A.** The link may have expired. We suggest you search for the makecode program for the relevant course again, or contact our customer service to get the latest link.

----

.. admonition:: Q. Can't the Integrated Demo_V1 be used for version V2?
   :class: danger

   **A.** Yes, it's possible. However, the V2 motherboard is more powerful, which means it requires more power. If the car cannot run properly when using the integrated program, it is recommended to replace it with a larger capacity battery or adjust the functional modules in the program to reduce the power demand.

----

.. admonition:: Q. Why is the line-following function unstable?
   :class: note

   **A.** The sensitivity of the line-following sensor needs to be adjusted using the blue potentiometer on the vehicle to suit different environments. It is recommended to make appropriate adjustments in different environments to obtain a more stable line-following effect.

----

.. admonition:: Q. What causes inaccurate ultrasonic ranging?
   :class: tip

   **A.** Ultrasonic ranging is greatly affected by environmental factors and has high power requirements. Please ensure that the battery has sufficient power. Also, the accuracy of the measured data will vary when using different versions of MicroBit motherboards, but the same effect can be achieved through code debugging.


----

.. admonition:: Q. 拓展库不能正常使用？
   :class: danger

   **A.** 可能你没有正确安装拓展库，或者以前安装过的拓展库版本过旧了，可点击"JavaScript"，左侧有个资源管理器，点开找到LAFVIN_MBIT的拓展库，点击刷新图标即可进行刷新。