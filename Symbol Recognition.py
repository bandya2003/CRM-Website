import sys
import seaborn as sns
import numpy as np
np.set_printoptions(threshold=sys.maxsize)
import pandas as pd
import os
import h5py
import PIL
import cv2
import tensorflow as tf
import tensorflow.keras as keras

from PIL import Image

from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, confusion_matrix
from tensorflow.keras.preprocessing import image
from tensorflow.keras.optimizers import RMSprop
from tensorflow.keras.callbacks import ReduceLROnPlateau
from tensorflow.keras.callbacks import EarlyStopping
from tensorflow.keras.callbacks import ModelCheckpoint
from tensorflow.keras.models import load_model
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Conv2D, Flatten, Dropout, MaxPooling2D
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import matplotlib.pylab as plt
from matplotlib import cm
import matplotlib.pylab as pylab
pylab.rcParams["figure.figsize"] = (14,8)

input_folder = 'E:/Chepyolkin/Kursach/archive/all_letters_image/all_letters_image/'
all_letters_filename = os.listdir(input_folder)
len(all_letters_filename)

i = Image.open("E:/Chepyolkin/Kursach/archive/all_letters_image/all_letters_image/20_102.png")

i_arr = np.array(i)
i_arr

def img_to_array(img_name, input_folder):
    img = image.load_img(input_folder + img_name, target_size=(32,32))
    x = image.img_to_array(img)
    return np.expand_dims(x, axis=0)
def data_to_tensor(img_names, input_folder):
    list_of_tensors = [img_to_array(img_name, input_folder) for img_name in img_names]
    return np.vstack(list_of_tensors)

data = pd.read_csv("E:/Chepyolkin/Kursach/archive/all_letters_info.csv")
image_names = data['file']
letters = data[ 'letter']
backgrounds = data['background'].values
targets = data['label'].values
tensors = data_to_tensor(image_names, input_folder)
tensors[0]

print ('Tensor shape:', tensors.shape)
print ('Target shape', targets.shape)


def display_images(img_path, ax):
    img = cv2.imread(input_folder + img_path)
    ax.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))


fig = plt.figure(figsize=(16, 4))
for i in range(12):
    ax = fig.add_subplot(2, 6, i + 1, xticks=[], yticks=[], title=letters[i * 100])
    display_images(image_names[i * 100], ax)

g = sns.countplot(targets)

X = tensors.astype("float32")/255
arr = X[0]
arr_ = np.squeeze(arr)
plt.imshow(arr_)
plt.show()

targets[0]

y = targets

img_rows, img_cols = 32, 32
num_classes = 33

y = keras.utils.to_categorical(y-1, num_classes)

print(X.shape)
print(y.shape)

def captch_ex(file_name):
    img = cv2.imread(file_name)
    img_final = cv2.imread(file_name)
    img2gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    ret, mask = cv2.threshold(img2gray, 180, 255, cv2.THRESH_BINARY)
    image_final = cv2.bitwise_and(img2gray, img2gray, mask=mask)
    ret, new_img = cv2.threshold(image_final, 180, 255, cv2.THRESH_BINARY)

    kernel = cv2.getStructuringElement(cv2.MORPH_CROSS, (3, 3))

    dilated = cv2.dilate(new_img, kernel, iterations=9)

    contours, hierarchy = cv2.findContours(new_img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)

    for contour in contours:

        [x, y, w, h] = cv2.boundingRect(contour)

        if w < 35 and h < 35:
            continue

        cv2.rectangle(img, (x, y), (x + w, y + h), (255, 0, 255), 2)

    cv2.imshow('captcha_result', img)
    cv2.waitKey()

file_name = 'E:/Chepyolkin/Kursach/archive/all_letters_image/all_letters_image/04_100.png'

X_grey = np.dot(X[...,:3], [0.299, 0.587, 0.114])

print ('Grayscaled Tensor shape:', X_grey.shape)

plt.imshow(X_grey[0], cmap=plt.get_cmap("gray"))

#MODEL
X_train_whole, X_test, y_train_whole, y_test = train_test_split(X, y, test_size=0.1, random_state=1)

X_train, X_val, y_train, y_val = train_test_split(X_train_whole, y_train_whole, test_size=0.1, random_state=1)

datagen = ImageDataGenerator(
        featurewise_center=False,
        samplewise_center=False,
        featurewise_std_normalization=False,
        samplewise_std_normalization=False,
        zca_whitening=False,
        rotation_range=10,
        zoom_range = 0.1,
        width_shift_range=0.1,
        height_shift_range=0.1,
        horizontal_flip=False,
        vertical_flip=False)

deep_RU_model = Sequential()

deep_RU_model.add(Conv2D(filters = 32, kernel_size = (5,5),padding = 'Same',
                 activation ='relu', input_shape = (img_rows,img_cols,3)))
deep_RU_model.add(Conv2D(filters = 32, kernel_size = (5,5),padding = 'Same',
                 activation ='relu'))
deep_RU_model.add(MaxPooling2D(pool_size=(2,2)))
deep_RU_model.add(Dropout(0.25))


deep_RU_model.add(Conv2D(filters = 64, kernel_size = (3,3),padding = 'Same',
                 activation ='relu'))
deep_RU_model.add(Conv2D(filters = 64, kernel_size = (3,3),padding = 'Same',
                 activation ='relu'))
deep_RU_model.add(MaxPooling2D(pool_size=(2,2), strides=(2,2)))
deep_RU_model.add(Dropout(0.25))


deep_RU_model.add(Flatten())
deep_RU_model.add(Dense(256, activation = "relu"))
deep_RU_model.add(Dropout(0.5))
deep_RU_model.add(Dense(33, activation = "softmax"))

optimizer = RMSprop(learning_rate=0.001, rho=0.9, epsilon=1e-08, decay=0.0)

deep_RU_model.compile(loss="categorical_crossentropy", optimizer = optimizer,metrics=["accuracy"])

learning_rate_reduction = ReduceLROnPlateau(monitor='val_acc',
                                            patience=3,
                                            verbose=1,
                                            factor=0.5,
                                            min_lr=0.00001)

es = EarlyStopping(monitor='val_accuracy', mode='max', verbose=1, patience=50)
mc = ModelCheckpoint('best_model.h5', monitor='val_accuracy', mode='max', verbose=1, save_best_only=True)

history = deep_RU_model.fit(datagen.flow(X_train,y_train, batch_size=90), validation_data = (X_val, y_val),
                            epochs=139, callbacks=[learning_rate_reduction, es, mc])

saved_model = load_model('best_model.h5')

_, train_acc = saved_model.evaluate(X_train, y_train, verbose=0)
_, valid_acc = saved_model.evaluate(X_val, y_val, verbose=0)

print('Train: %.3f, Valid: %.3f' % (train_acc, valid_acc))

fig, ax = plt.subplots(2,1)
ax[0].plot(history.history['loss'], color='b', label="Training loss")
ax[0].plot(history.history['val_loss'], color='r', label="validation loss",axes =ax[0])
legend = ax[0].legend(loc='best', shadow=True)

ax[1].plot(history.history['accuracy'], color='b', label="Training accuracy")
ax[1].plot(history.history['val_accuracy'], color='r',label="Validation accuracy")
legend = ax[1].legend(loc='best', shadow=True)

_, test_acc = saved_model.evaluate(X_test, y_test, verbose=0)
print('Test: %.3f' % (test_acc))

y_pred = deep_RU_model.predict(X_test)
y_pred = np.argmax(y_pred, axis=1)
y_test = np.argmax(y_test, axis=1)
confusion_mtx = confusion_matrix(y_test, y_pred)
sns.heatmap(confusion_mtx, annot=True, fmt='d')

# Display some error results

# Convert one-hot vector to labels
Y_true = y_test

# Predict the values from the test dataset
Y_pred = saved_model.predict(X_test)
# Convert predictions from one-hot vectors to labels
Y_pred_classes = np.argmax(Y_pred,axis = 1)

# Errors are difference between predicted labels and true labels
errors = (Y_pred_classes - Y_true != 0)

Y_pred_classes_errors = Y_pred_classes[errors]
Y_pred_errors = Y_pred[errors]
Y_true_errors = Y_true[errors]
X_val_errors = X_test[errors]

def display_errors(errors_index,img_errors,pred_errors, obs_errors):
    """ This function shows 6 images with their predicted and real labels"""
    n = 0
    nrows = 2
    ncols = 3
    fig, ax = plt.subplots(nrows,ncols,sharex=True,sharey=True)
    for row in range(nrows):
        for col in range(ncols):
            error = errors_index[n]
            ax[row,col].imshow((img_errors[error]))
            ax[row,col].set_title("Predicted label :{}\nTrue label :{}".format(pred_errors[error],obs_errors[error]))
            n += 1

# Probabilities of the wrongly predicted letters
Y_pred_errors_prob = np.max(Y_pred_errors,axis = 1)

# Predicted probabilities of the true values in the error set
true_prob_errors = np.diagonal(np.take(Y_pred_errors, Y_true_errors, axis=1))

# Difference between the probability of the predicted label and the true label
delta_pred_true_errors = Y_pred_errors_prob - true_prob_errors

# Sorted list of the delta prob errors
sorted_delta_errors = np.argsort(delta_pred_true_errors)

# Top 6 errors
most_important_errors = sorted_delta_errors[-6:]

# Show the top 6 errors
display_errors(most_important_errors, X_val_errors, Y_pred_classes_errors, Y_true_errors)
