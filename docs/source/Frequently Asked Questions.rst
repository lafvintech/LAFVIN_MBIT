.. _frequently_asked_questions:

Frequently Asked Questions
==========================

Compatibility and Power
-----------------------

.. admonition:: Q. Can I use the course programs and Integrated Demo_V1 with micro:bit V1.5 and V2?
   :class: tip

   **A.** Most course programs work with both micro:bit V1.5 and V2, although
   their performance can differ. Integrated Demo_V1 can also be used with V2.
   Some V2 programs need more power, so if the Smart Car board does not run
   reliably, use fresh batteries or reduce the number of active modules.
   Refer to the official micro:bit documentation for board-version details.

Car Attachments and Sensors
---------------------------

.. admonition:: Q. Why can't I use the HC-SR04 ultrasonic module or I2C functions after I install the shovel?
   :class: note

   **A.** The shovel occupies the **HC-SR04 and I2C interface**. Remove the
   shovel before using the HC-SR04 ultrasonic module or I2C functions.

.. admonition:: Q. Why does the car move slowly or unreliably after I install the shovel?
   :class: note

   **A.** The shovel adds weight to the car. Adjust the N20-motor speed values
   in the program until the car moves reliably with the new load.

.. admonition:: Q. Why is line following unstable?
   :class: note

   **A.** Turn the blue potentiometer on the Smart Car board to adjust the
   sensitivity of the line-following sensors. Set it again when the surface or
   lighting changes.

.. admonition:: Q. Why is the HC-SR04 ultrasonic distance not accurate?
   :class: note

   **A.** Ultrasonic readings are affected by the surface, angle, and
   surroundings, and can vary by about 1–2 cm. Use fresh batteries, test with
   the micro:bit version you are using, then adjust the distance values in the
   program if necessary.

MakeCode and Downloading
------------------------

.. admonition:: Q. What should I do if a MakeCode link in the course does not open?
   :class: warning

   **A.** The shared link may have expired. Search again for the MakeCode
   program for that course, or contact customer service for the latest link.

.. admonition:: Q. Why is the LAFVIN extension not working properly?
   :class: warning

   **A.** Check that the extension was added correctly and is up to date. In
   MakeCode, click **JavaScript**, open the Explorer on the left, find the
   ``LAFVIN_MBIT`` extension, then click its refresh icon.

.. admonition:: Q. Why is there no response after I upload code, or why does the previous program still run?
   :class: danger

   **A.** Try these steps in order:

   #. Upload the program again.
   #. Unplug and reconnect the Micro-USB cable.
   #. Wait briefly for the micro:bit to restart.
   #. Press the micro:bit reset button if the previous program still runs.
