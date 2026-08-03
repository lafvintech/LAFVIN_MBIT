.. _car_assembly:

Assembling the Smart Car
========================

Build the basic car first. The forklift and HC-SR04 ultrasonic forms are
optional additions that are fitted only after the basic car is complete.

Basic Car Assembly
------------------

.. tip:: The two types of screwdrivers are suitable for securing screws in different locations.

1. Fit the cross axles
~~~~~~~~~~~~~~~~~~~~~~

Push one **cross axle** straight into each N20-motor shaft. The cross shape on
the outside is what holds the wheel. Push gently but firmly until each axle is
secure and straight.

.. figure:: /Tutorial/img/安装十字轴.jpg
   :align: center
   :alt: Fitting a cross axle to an N20 motor shaft

2. Attach the directional wheel
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Turn the Smart Car board over. Place the **directional wheel** in the front
position shown in the picture and fasten it with two M3 × 6 mm screws. Check
that the wheel can turn freely after the screws are tightened.

.. figure:: /Tutorial/img/安装定向轮.png
   :align: center
   :alt: Attaching the directional wheel with two M3 by 6 millimetre screws

3. Apply the adhesive pads
~~~~~~~~~~~~~~~~~~~~~~~~~~

Peel off the backing paper and press the round adhesive pads onto the positions
shown in the picture. Press each pad down firmly so it stays in place.

.. figure:: /Tutorial/img/粘贴点胶.jpg
   :align: center
   :alt: Applying the round adhesive pads to the Smart Car board

4. Install and connect the battery box
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Place the **battery box** on the Smart Car board as shown. Then insert the
white battery plug into the socket labelled ``Battery 3.5V–5V``. The plug
should be fully seated.

.. figure:: /Tutorial/img/安装电池盒.jpg
   :align: center
   :alt: Placing the battery box on the Smart Car board

.. figure:: /Tutorial/img/插上电源接口.jpg
   :align: center
   :alt: Connecting the battery plug to the Battery 3.5V to 5V socket

5. Fit the wheels
~~~~~~~~~~~~~~~~~

Push a wheel onto each cross axle. Press the centre of the wheel until it is
secure.

.. figure:: /Tutorial/img/安装轮胎.jpg
   :align: center
   :alt: Pressing a wheel onto a cross axle

6. Insert the micro:bit
~~~~~~~~~~~~~~~~~~~~~~~

Slide the micro:bit straight down into the **micro:bit connector**. Keep its
LED display and buttons facing the front of the Smart Car, as in the picture.
Do not twist the micro:bit while inserting it.

.. figure:: /Tutorial/img/插入主板.jpg
   :align: center
   :alt: Inserting the microbit into the Smart Car board connector

Before adding batteries or switching on, check that the wheels and directional
wheel move freely, the battery plug is fully connected, and the micro:bit is seated
straight in its connector.


.. _forklift_assembly:

Forklift Assembly
-----------------

1. Fit the bearing
~~~~~~~~~~~~~~~~~~

Press the 3 × 6 × 2.5 bearing into the round hole at the top of the forklift
bracket. It should sit flat in the hole.

.. figure:: /Tutorial/img/装轴承.png
   :align: center
   :alt: Fitting the bearing into the forklift bracket

2. Mount the SG90 servo
~~~~~~~~~~~~~~~~~~~~~~~

Place the **SG90 servo** between the bracket sides as shown. Use two M2 × 8 mm
screws and two M2 nuts to fasten the servo tabs. Then secure the other mounting
points with the two M1.5 × 5 mm self-tapping screws shown in the next picture.

.. figure:: /Tutorial/img/安装舵机.jpg
   :align: center
   :alt: Placing the SG90 servo in the forklift bracket

.. figure:: /Tutorial/img/定舵机.png
   :align: center
   :alt: Securing the SG90 servo with M2 by 8 millimetre screws and M2 nuts

.. figure:: /Tutorial/img/装摆臂.png
   :align: center
   :alt: Securing the servo mounting points with M1.5 by 5 millimetre screws

3. Fit the lifting arm and fork
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Attach the lifting arm to the servo horn with the M2 × 4 mm self-tapping screw.
Then fasten the fork part with the M3 × 6 mm screw, following the two pictures.
Tighten the screws enough to hold the parts, while keeping the arm free to move.

.. figure:: /Tutorial/img/定摆臂.png
   :align: center
   :alt: Fixing the lifting arm with an M2 by 4 millimetre self-tapping screw

.. figure:: /Tutorial/img/定铲子.png
   :align: center
   :alt: Fixing the fork part with an M3 by 6 millimetre screw

4. Attach the forklift to the car
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use the two M3 × 20 + 5 mm copper pillars and two M3 × 6 mm screws to fasten
the completed forklift assembly at the front of the basic car.

.. figure:: /Tutorial/img/定铲车.png
   :align: center
   :alt: Attaching the forklift assembly to the front of the Smart Car

5. Connect the servo
~~~~~~~~~~~~~~~~~~~~

Plug the SG90 servo cable into position **S1** on the Smart Car board's
**servo interface**. Match the connector with the ``G``, ``V``, and signal
markings on the board. Do not force the plug.

.. figure:: /Tutorial/img/接入舵机.jpg
   :align: center
   :alt: Connecting the SG90 servo cable to the S1 servo interface

Before switching on, move the fork gently by hand to check that nothing is
jammed. Do not force the servo arm past its physical stop.


Use the HC-SR04 Ultrasonic Form Instead
----------------------------------------

The forklift and the **HC-SR04 ultrasonic module** use the same front area, so
they cannot be installed at the same time. To use ultrasonic programs, remove
the forklift assembly and install the HC-SR04 ultrasonic module at the front,
as shown below.

.. figure:: /Tutorial/img/超声波形态.jpg
   :align: center
   :alt: Smart Car with the HC-SR04 ultrasonic module installed at the front


Power
-----

Use a 3.5–5 V DC battery supply: either three AAA batteries in the supplied
battery box or a suitable 3.6–3.7 V lithium battery. Insert batteries with the
correct polarity and do not mix old and new batteries.

The Micro-USB cable supplies power to the micro:bit while you download code.
It does **not** provide enough power for the Smart Car board, N20 motors, and
connected parts. Use the battery supply when you test the moving car.
