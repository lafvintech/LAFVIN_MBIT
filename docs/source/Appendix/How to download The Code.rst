.. _how-to-download-code:

How to Download Code to the micro:bit
=====================================

There are two ways to put a program on the micro:bit:

* Copy a prepared ``.hex`` file when you want to run one of the supplied
  examples right away.
* Use MakeCode when you want to create a new program or change an example.

Option 1: Copy a Prepared .hex File
-----------------------------------

A ``.hex`` file is a program file that the micro:bit can run. When you connect
the micro:bit to a computer with a **data USB cable**, it appears in File
Explorer as a drive named **MICROBIT**.

1. Connect the micro:bit to the computer. Check that the **MICROBIT** drive
   appears. If it does not appear, try another USB cable; some cables provide
   power only and cannot transfer files.
2. Download the `code files <https://github.com/lafvintech/LAFVIN_MBIT/archive/refs/heads/HexFile.zip>`_,
   unzip the download, and find the ``.hex`` file for the example you want.
3. Drag the ``.hex`` file onto the **MICROBIT** drive, or copy and paste it
   there.
4. Wait for the file transfer to finish before unplugging the USB cable. The
   micro:bit restarts and begins running the new program automatically.

.. figure:: ./img/查看磁盘.png
   :align: center
   :width: 85%
   :alt: The MICROBIT drive in File Explorer

   Find the drive named ``MICROBIT`` in File Explorer.

.. figure:: ./img/复制hex文件.png
   :align: center
   :width: 85%
   :alt: A hex file ready to copy to the MICROBIT drive

.. figure:: ./img/拖拽进磁盘.png
   :align: center
   :width: 85%
   :alt: Dragging a hex file to the MICROBIT drive


Option 2: Create or Edit Code in MakeCode
------------------------------------------

`MakeCode for micro:bit <https://makecode.microbit.org/>`_ is the block
programming website used in this guide. It is the right choice when you want to
write your own program or change a supplied example.

Open MakeCode
~~~~~~~~~~~~~

You can open MakeCode in either of these ways:

* Open `makecode.microbit.org <https://makecode.microbit.org/>`_ in a web
  browser.
* Open the MakeCode shortcut shown on the **MICROBIT** drive after connecting
  the micro:bit.

.. figure:: ./img/查看磁盘.png
   :align: center
   :width: 85%
   :alt: The MICROBIT drive in File Explorer

.. figure:: ./img/打开网址.png
   :align: center
   :width: 85%
   :alt: The MakeCode shortcut on the MICROBIT drive

Start a project
~~~~~~~~~~~~~~~

Select **New Project**, give the project a name, and use the colored blocks to
build the program. The example links in this guide open ready-made projects,
so you can view or change their blocks without starting from an empty project.

.. figure:: ./img/MakeCode首页.png
   :align: center
   :width: 85%
   :alt: MakeCode home page

.. figure:: ./img/新建项目.png
   :align: center
   :width: 85%
   :alt: New Project button in MakeCode

.. figure:: ./img/项目命名.png
   :align: center
   :width: 85%
   :alt: Naming a MakeCode project

Add the LAFVIN extension
~~~~~~~~~~~~~~~~~~~~~~~~

Add the extension before using LAFVIN car blocks in a **new** MakeCode project.

1. Click **Extensions** at the bottom of the block-category list.
2. Paste this address into the search box and search:

   ``https://github.com/lafvintech/LAFVIN_MBIT.git``

3. Select the **LAFVIN** extension card and wait for MakeCode to return to the
   workspace.
4. The **LA_MBitCar** and **Neopixel** categories then appear in the
   block-category list.

.. figure:: ./img/导入拓展.png
   :align: center
   :width: 100%
   :alt: Extensions button in MakeCode

.. figure:: ./img/搜索拓展.png
   :align: center
   :width: 100%
   :alt: Pasting the LAFVIN extension address into the search box

.. figure:: ./img/添加拓展.png
   :align: center
   :width: 100%
   :alt: Selecting the LAFVIN extension card

.. figure:: ./img/导入成功.png
   :align: center
   :width: 100%
   :alt: LAFVIN extension installed in MakeCode

.. figure:: ./img/查看拓展.png
   :align: center
   :width: 100%
   :alt: LA MBitCar and Neopixel categories in MakeCode

.. figure:: ./img/查看NEO.png
   :align: center
   :width: 100%
   :alt: LAFVIN blocks in the LA MBitCar category

Download your MakeCode program
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When your blocks are ready, click **Download**. MakeCode creates a ``.hex``
file. Copy that file to the **MICROBIT** drive using the same steps in Option 1.

If you have paired the micro:bit with MakeCode, follow the on-screen prompt to
send the program directly instead. In either method, wait until the transfer
has finished before unplugging the USB cable.

.. figure:: ./img/点击下载.png
   :align: center
   :width: 85%
   :alt: Download button in MakeCode


If the extension does not appear
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Refresh the MakeCode page and open the project again. This makes MakeCode check
the current extension files from GitHub. If the extension still does not load,
check that the computer is connected to the internet and that the address above
was copied completely.

.. figure:: ./img/刷新1.png
   :align: center
   :width: 100%
   :alt: Refreshing a MakeCode project with the LAFVIN extension

.. figure:: ./img/刷新2.png
   :align: center
   :width: 100%
   :alt: The refreshed LAFVIN extension version in MakeCode

.. tip::

   A supplied MakeCode example link already includes the LAFVIN extension. A
   supplied ``.hex`` file is ready to copy to the micro:bit and does not need
   an extension installed first.
